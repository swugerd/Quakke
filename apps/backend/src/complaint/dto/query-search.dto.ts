import { Field, InputType, IntersectionType } from '@nestjs/graphql';
import { ComplaintReasons } from '@prisma/client';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from 'src/constants';
import fieldsDescriptions from 'src/constants/fields.descriptions';
import { OrderDto } from 'src/utils/dto/order.input';
import { PaginationDto } from 'src/utils/dto/pagination.dto';

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
