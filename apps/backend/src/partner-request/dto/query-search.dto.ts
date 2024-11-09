import { Field, InputType, IntersectionType } from '@nestjs/graphql';
import { PartnerRequestStatuses } from '@prisma/client';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { OrderDto } from '../../utils/dto/order.input';
import { PaginationDto } from '../../utils/dto/pagination.dto';

@InputType()
export class PartnerRequestQuerySearchDto extends IntersectionType(
  PaginationDto,
  OrderDto,
) {
  @Field(() => String, {
    nullable: true,
    description: fieldsDescriptions.partnerRequest.message,
  })
  @MaxLength(maxCharLengthList.longText)
  message?: string;

  @Field(() => PartnerRequestStatuses, {
    nullable: true,
    description: fieldsDescriptions.partnerRequest.status,
  })
  @MaxLength(maxCharLengthList.default)
  status?: PartnerRequestStatuses;
}
