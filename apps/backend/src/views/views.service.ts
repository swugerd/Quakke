import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from '../auth/interfaces';

const includeObject = {
  user: true,
  video: true,
};

@Injectable()
export class ViewsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateViewDto, user: JwtPayload) {
    const isViewExists = await this.prismaService.view.findFirst({
      where: {
        AND: [{ videoId: dto.videoId }, { userId: user.id }],
      },
    });

    if (isViewExists) {
      throw new BadRequestException(
        'View for this user on this video already exists',
      );
    }

    const view = await this.prismaService.view.create({
      data: {
        userId: user.id,
        videoId: dto.videoId,
      },
      include: includeObject,
    });

    return view;
  }

  async findAll() {
    const views = await this.prismaService.view.findMany({
      include: includeObject,
    });

    return views;
  }

  async findOne(id: number) {
    const view = await this.prismaService.view.findUnique({
      where: {
        id,
      },
      include: includeObject,
    });

    return view;
  }

  async update(id: number, dto: UpdateViewDto) {
    const view = await this.prismaService.view.update({
      where: {
        id,
      },
      data: dto,
      include: includeObject,
    });

    return view;
  }

  async remove(id: number) {
    const view = await this.prismaService.view.delete({
      where: {
        id,
      },
      include: includeObject,
    });

    return view;
  }
}
