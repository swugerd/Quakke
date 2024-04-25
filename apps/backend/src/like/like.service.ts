import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/auth/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';

const includeObject = {
  comment: true,
  video: true,
  user: true,
};

@Injectable()
export class LikeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createLikeInput: CreateLikeInput, user: JwtPayload) {
    const isLikeExists = await this.prismaService.like.findFirst({
      where: {
        AND: [
          {
            OR: [
              {
                videoId: createLikeInput.videoId,
              },
              {
                commentId: createLikeInput.commentId,
              },
            ],
          },
          {
            userId: user.id,
          },
        ],
      },
    });

    if (isLikeExists) {
      throw new BadRequestException(
        'Like for this user on this video or comment already exists',
      );
    }

    const like = await this.prismaService.like.create({
      data: { ...createLikeInput, userId: user.id },
      include: includeObject,
    });

    return like;
  }

  async findAll() {
    const likes = await this.prismaService.like.findMany({
      include: includeObject,
    });

    return likes;
  }

  async findOne(id: number) {
    const like = await this.prismaService.like.findUnique({
      where: {
        id,
      },
      include: includeObject,
    });

    return like;
  }

  async update(id: number, updateLikeInput: UpdateLikeInput) {
    const like = await this.prismaService.like.update({
      where: {
        id,
      },
      data: updateLikeInput,
      include: includeObject,
    });

    return like;
  }

  async remove(id: number) {
    const like = await this.prismaService.like.delete({
      where: {
        id,
      },
      include: includeObject,
    });

    return like;
  }
}
