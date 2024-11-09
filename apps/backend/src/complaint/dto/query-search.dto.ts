import { Field, InputType, IntersectionType } from '@nestjs/graphql';
import { ComplaintReasons } from '@prisma/client';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { OrderDto } from '../../utils/dto/order.input';
import { PaginationDto } from '../../utils/dto/pagination.dto';

@InputType()
export class ComplaintQuerySearchDto extends IntersectionType(
  PaginationDto,
  OrderDto,
) {
  @Field(() => ComplaintReasons, {
    nullable: true,
    description: fieldsDescriptions.complaint.reason,
  })
  @MaxLength(maxCharLengthList.default)
  reason?: ComplaintReasons;

  @Field(() => String, {
    nullable: true,
    description: fieldsDescriptions.complaint.message,
  })
  @MaxLength(maxCharLengthList.longText)
  message?: string;
}
