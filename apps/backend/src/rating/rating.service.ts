import { BadRequestException, Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from '../auth/interfaces';
import { LikesType } from '../types';

const pubSub = new PubSub();

const includeObject = {
  user: true,
};

@Injectable()
export class RatingService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateRatingDto, user: JwtPayload) {
    if (dto.type === 'LIKE') {
      const isLikeExists = await this.prismaService.like.findFirst({
        where: {
          AND: [
            {
              OR: [
                {
                  videoId: dto.videoId,
                },
                {
                  commentId: dto.commentId,
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

      const isDislikeExists = await this.prismaService.dislike.findFirst({
        where: {
          AND: [
            {
              OR: [
                {
                  videoId: dto.videoId,
                },
                {
                  commentId: dto.commentId,
                },
              ],
            },
            {
              userId: user.id,
            },
          ],
        },
      });

      if (isDislikeExists) {
        await this.prismaService.dislike.delete({
          where: {
            id: isDislikeExists.id,
          },
        });
      }

      const rating = await this.prismaService.like.create({
        data: {
          commentId: dto.commentId,
          videoId: dto.videoId,
          userId: user.id,
        },
        include: includeObject,
      });

      pubSub.publish('getMonitoring', { createdLike: rating });

      return rating;
    }

    const isDislikeExists = await this.prismaService.dislike.findFirst({
      where: {
        AND: [
          {
            OR: [
              {
                videoId: dto.videoId,
              },
              {
                commentId: dto.commentId,
              },
            ],
          },
          {
            userId: user.id,
          },
        ],
      },
    });

    if (isDislikeExists) {
      throw new BadRequestException(
        'Dislike for this user on this video or comment already exists',
      );
    }

    const isLikeExists = await this.prismaService.like.findFirst({
      where: {
        AND: [
          {
            OR: [
              {
                videoId: dto.videoId,
              },
              {
                commentId: dto.commentId,
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
      await this.prismaService.like.delete({
        where: {
          id: isLikeExists.id,
        },
      });
    }

    const rating = await this.prismaService.dislike.create({
      data: {
        commentId: dto.commentId,
        videoId: dto.videoId,
        userId: user.id,
      },
      include: includeObject,
    });

    return rating;
  }

  async findAll(type: LikesType) {
    if (type === 'LIKE') {
      const rating = await this.prismaService.like.findMany({
        include: includeObject,
      });

      return rating;
    }

    const rating = await this.prismaService.dislike.findMany({
      include: includeObject,
    });

    pubSub.publish('getMonitoring', { createdLike: rating });

    return rating;
  }

  async findOne(id: number, type: LikesType) {
    if (type === 'LIKE') {
      const rating = await this.prismaService.like.findUnique({
        where: {
          id,
        },
        include: includeObject,
      });

      return rating;
    }

    const rating = await this.prismaService.dislike.findMany({
      where: {
        id,
      },
      include: includeObject,
    });

    return rating;
  }

  async update(id: number, dto: UpdateRatingDto) {
    if (dto.type === 'LIKE') {
      const rating = await this.prismaService.like.update({
        where: {
          id,
        },
        data: {
          commentId: dto.commentId,
          videoId: dto.videoId,
        },
        include: includeObject,
      });

      return rating;
    }

    const rating = await this.prismaService.dislike.update({
      where: {
        id,
      },
      data: {
        commentId: dto.commentId,
        videoId: dto.videoId,
      },
      include: includeObject,
    });

    return rating;
  }

  async remove(id: number, type: LikesType) {
    if (type === 'LIKE') {
      const rating = await this.prismaService.like.delete({
        where: {
          id,
        },
        include: includeObject,
      });

      return rating;
    }

    const rating = await this.prismaService.dislike.delete({
      where: {
        id,
      },
      include: includeObject,
    });

    return rating;
  }
}
