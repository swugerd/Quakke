import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators';
import { JwtPayload } from '../auth/interfaces';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationQuerySearchDto } from './dto/query-search.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationPagination } from './entities/notification-pagination.entity';
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

  @Query(() => NotificationPagination)
  getNotificationsWithQuery(@Args('query') query: NotificationQuerySearchDto) {
    return this.notificationService.getAllWithQuery(query);
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
