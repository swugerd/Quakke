import { Field, InputType, IntersectionType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { OrderDto } from '../../utils/dto/order.input';
import { PaginationDto } from '../../utils/dto/pagination.dto';

@InputType()
export class VideoQuerySearchDto extends IntersectionType(
  PaginationDto,
  OrderDto,
) {
  @Field(() => String, {
    nullable: true,
    description: fieldsDescriptions.video.name,
  })
  @MaxLength(maxCharLengthList.default)
  name?: string;

  @Field(() => String, {
    nullable: true,
    description: fieldsDescriptions.video.description,
  })
  @MaxLength(maxCharLengthList.longText)
  description?: string;

  @Field(() => Boolean, {
    nullable: true,
    description: fieldsDescriptions.video.isBanned,
  })
  isBanned?: boolean;
}
