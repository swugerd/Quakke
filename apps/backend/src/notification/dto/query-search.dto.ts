import { InputType, IntersectionType } from '@nestjs/graphql';
import { OrderDto } from '../../utils/dto/order.input';
import { PaginationDto } from '../../utils/dto/pagination.dto';

@InputType()
export class NotificationQuerySearchDto extends IntersectionType(
  PaginationDto,
  OrderDto,
) {}
