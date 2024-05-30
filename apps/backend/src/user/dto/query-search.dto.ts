import { Field, InputType, IntersectionType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from 'src/constants';
import fieldsDescriptions from 'src/constants/fields.descriptions';
import { OrderDto } from 'src/utils/dto/order.input';
import { PaginationDto } from 'src/utils/dto/pagination.dto';

@InputType()
export class QuerySearchDto extends IntersectionType(PaginationDto, OrderDto) {
  @Field(() => String, {
    nullable: true,
    description: fieldsDescriptions.user.email,
  })
  @MaxLength(maxCharLengthList.default)
  email?: string;

  @Field(() => String, {
    nullable: true,
    description: fieldsDescriptions.user.login,
  })
  @MaxLength(maxCharLengthList.default)
  login?: string;

  @Field(() => String, {
    nullable: true,
    description: fieldsDescriptions.user.name,
  })
  @MaxLength(maxCharLengthList.default)
  name?: string;

  @Field(() => Boolean, {
    nullable: true,
    description: fieldsDescriptions.user.isBanned,
  })
  isBanned?: boolean;

  @Field(() => Boolean, {
    nullable: true,
    description: fieldsDescriptions.user.isPartner,
  })
  isPartner?: boolean;
}
