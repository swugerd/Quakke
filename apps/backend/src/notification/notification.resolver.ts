import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators';
import { JwtPayload } from 'src/auth/interfaces';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Mutation(() => Notification)
  createNotification(
    @Args('dto')
    dto: CreateNotificationDto,
  ) {
    return this.notificationService.create(dto);
  }

  @Query(() => [Notification])
  getNotifications() {
    return this.notificationService.findAll();
  }

  @Query(() => Notification)
  getNotification(@Args('id', { type: () => Int }) id: number) {
    return this.notificationService.findOne(id);
  }

  @Mutation(() => Notification)
  updateNotification(
    @Args('dto')
    dto: UpdateNotificationDto,
  ) {
    return this.notificationService.update(dto.id, dto);
  }

  @Mutation(() => Notification)
  removeNotification(@Args('id', { type: () => Int }) id: number) {
    return this.notificationService.remove(id);
  }

  @Query(() => [Notification])
  getUserNotifications(@CurrentUser() user: JwtPayload) {
    return this.notificationService.getAllByUserId(user);
  }
}
