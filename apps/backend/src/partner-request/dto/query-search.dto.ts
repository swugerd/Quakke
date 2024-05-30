import { Field, InputType, IntersectionType } from '@nestjs/graphql';
import { PartnerRequestStatuses } from '@prisma/client';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from 'src/constants';
import fieldsDescriptions from 'src/constants/fields.descriptions';
import { OrderDto } from 'src/utils/dto/order.input';
import { PaginationDto } from 'src/utils/dto/pagination.dto';

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
