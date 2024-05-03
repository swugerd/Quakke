import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSettingInput } from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';

const includeObject = {
  user: true,
};

@Injectable()
export class SettingsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSettingInput: CreateSettingInput) {
    const settings = await this.prismaService.settings.create({
      data: createSettingInput,
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

  async update(updateSettingInput: UpdateSettingInput) {
    const settings = await this.prismaService.settings.update({
      where: {
        id: updateSettingInput.id,
      },
      data: updateSettingInput,
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
