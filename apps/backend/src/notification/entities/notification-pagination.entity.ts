import { ObjectType } from '@nestjs/graphql';
import { Pagination } from '../../utils/entities/pagination.entity';
import { Notification } from './notification.entity';

@ObjectType()
export class NotificationPagination extends Pagination(Notification) {}
