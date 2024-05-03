import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PrismaService } from 'src/prisma/prisma.service';

const pubSub = new PubSub();

@Injectable()
export class StatsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMonitoring(userId: number) {
    const [
      viewsCount,
      likesCount,
      dislikesCount,
      commentsCount,
      subscribersCount,
    ] = await Promise.allSettled([
      this.prismaService.view.count({
        where: {
          userId,
        },
      }),
      this.prismaService.like.count({
        where: {
          userId,
        },
      }),
      this.prismaService.dislike.count({
        where: {
          userId,
        },
      }),
      this.prismaService.comment.count({
        where: {
          userId,
        },
      }),
      this.prismaService.user.count({
        where: {
          userId,
        },
      }),
    ]);

    pubSub.asyncIterator('getMonitoring');

    return {
      viewsCount:
        viewsCount.status === 'fulfilled' ? viewsCount.value : undefined,
      likesCount:
        likesCount.status === 'fulfilled' ? likesCount.value : undefined,
      dislikesCount:
        dislikesCount.status === 'fulfilled' ? dislikesCount.value : undefined,
      commentsCount:
        commentsCount.status === 'fulfilled' ? commentsCount.value : undefined,
      subscribersCount:
        subscribersCount.status === 'fulfilled'
          ? subscribersCount.value
          : undefined,
    };
  }
}
