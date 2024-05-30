import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { CreateTagDto } from './create-tag.dto';

@InputType()
export class UpdateTagDto extends PartialType(CreateTagDto) {
  @Field(() => Int, { description: fieldsDescriptions.id })
  @MaxLength(maxCharLengthList.default)
  id: number;
}
