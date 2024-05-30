import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { PrismaService } from '../prisma/prisma.service';

const includeObject = {
  user: true,
};

@Injectable()
export class SettingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateSettingDto) {
    const settings = await this.prismaService.settings.create({
      data: dto,
      include: includeObject,
    });

    return settings;
  }

  async findAll() {
    const settings = await this.prismaService.settings.findMany({
      include: includeObject,
    });

    return settings;
  }

  async findOne(id?: number, userId?: number) {
    const settings = await this.prismaService.settings.findFirst({
      where: {
        OR: [{ id }, { userId }],
      },
      include: includeObject,
    });

    return settings;
  }

  async update(dto: UpdateSettingDto) {
    const settings = await this.prismaService.settings.update({
      where: {
        id: dto.id,
      },
      data: dto,
      include: includeObject,
    });

    return settings;
  }

  async remove(id: number) {
    const settings = await this.prismaService.settings.delete({
      where: {
        id,
      },
      include: includeObject,
    });

    return settings;
  }
}
