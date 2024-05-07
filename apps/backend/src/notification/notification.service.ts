import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/auth/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

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
