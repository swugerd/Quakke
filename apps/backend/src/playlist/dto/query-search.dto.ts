import { Field, InputType, IntersectionType } from '@nestjs/graphql';
import { Privacy } from '@prisma/client';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { OrderDto } from '../../utils/dto/order.input';
import { PaginationDto } from '../../utils/dto/pagination.dto';

@InputType()
export class PlaylistQuerySearchDto extends IntersectionType(
  PaginationDto,
  OrderDto,
) {
  @Field(() => String, {
    nullable: true,
    description: fieldsDescriptions.playlist.name,
  })
  @MaxLength(maxCharLengthList.default)
  name?: string;

  @Field(() => Privacy, {
    nullable: true,
    description: fieldsDescriptions.playlist.privacy,
  })
  @MaxLength(maxCharLengthList.default)
  privacy?: Privacy;
}
