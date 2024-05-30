import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { CreateRatingDto } from './create-rating.dto';

@InputType()
export class UpdateRatingDto extends PartialType(CreateRatingDto) {
  @Field(() => Int, { description: fieldsDescriptions.id })
  @MaxLength(maxCharLengthList.default)
  id: number;
}
