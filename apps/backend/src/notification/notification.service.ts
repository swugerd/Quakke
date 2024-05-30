import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationQuerySearchDto } from './dto/query-search.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from '../auth/interfaces';

const includeObject = {
  user: true,
};

@Injectable()
export class NotificationService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateNotificationDto) {
    const notification = await this.prismaService.notification.create({
      data: dto,
      include: includeObject,
    });

    return notification;
  }

  async findAll() {
    const notifications = await this.prismaService.notification.findMany({
      include: includeObject,
    });

    return notifications;
  }

  async getAllWithQuery(query: NotificationQuerySearchDto) {
    const findManyOptions: Prisma.NotificationFindManyArgs = {
      where: {},
      skip: query.offset,
      take: query.limit,
    };

    if (query.orderBy && query.orderDirection) {
      findManyOptions.orderBy = [
        Object.fromEntries([[query.orderBy, query.orderDirection]]),
      ];
    }

    const [data, count] = await this.prismaService.$transaction([
      this.prismaService.notification.findMany({
        ...findManyOptions,
      }),
      this.prismaService.notification.count({ where: findManyOptions.where }),
    ]);

    return {
      data,
      count,
    };
  }

  async findOne(id: number) {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id,
      },
      include: includeObject,
    });

    return notification;
  }

  async update(id: number, dto: UpdateNotificationDto) {
    const notification = await this.prismaService.notification.update({
      where: {
        id,
      },
      data: dto,
      include: includeObject,
    });

    return notification;
  }

  async remove(id: number) {
    const notification = await this.prismaService.notification.delete({
      where: {
        id,
      },
      include: includeObject,
    });

    return notification;
  }

  async getAllByUserId(user: JwtPayload) {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        userId: user.id,
      },
      include: includeObject,
    });

    return notifications;
  }
}
