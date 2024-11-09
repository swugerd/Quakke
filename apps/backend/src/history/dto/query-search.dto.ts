import { InputType, IntersectionType } from '@nestjs/graphql';
import { OrderDto } from '../../utils/dto/order.input';
import { PaginationDto } from '../../utils/dto/pagination.dto';

@InputType()
export class HistoryQuerySearchDto extends IntersectionType(
  PaginationDto,
  OrderDto,
) {}
