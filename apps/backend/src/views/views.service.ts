import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/auth/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateViewInput } from './dto/create-view.input';
import { UpdateViewInput } from './dto/update-view.input';

const includeObject = {
  user: true,
  video: true,
};

@Injectable()
export class ViewsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createViewInput: CreateViewInput, user: JwtPayload) {
    const isViewExists = await this.prismaService.view.findFirst({
      where: {
        AND: [{ videoId: createViewInput.videoId }, { userId: user.id }],
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
        videoId: createViewInput.videoId,
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

  async update(id: number, updateViewInput: UpdateViewInput) {
    const view = await this.prismaService.view.update({
      where: {
        id,
      },
      data: updateViewInput,
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
