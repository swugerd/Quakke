import { Field, InputType, IntersectionType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { OrderDto } from '../../utils/dto/order.input';
import { PaginationDto } from '../../utils/dto/pagination.dto';

@InputType()
export class CommentsQuerySearchDto extends IntersectionType(
  PaginationDto,
  OrderDto,
) {
  @Field(() => String, {
    nullable: true,
    description: fieldsDescriptions.comment.text,
  })
  @MaxLength(maxCharLengthList.default)
  text?: string;
}
