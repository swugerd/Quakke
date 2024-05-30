import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from 'src/constants';
import fieldsDescriptions from 'src/constants/fields.descriptions';
import { CreateTagDto } from './create-tag.dto';

@InputType()
export class UpdateTagDto extends PartialType(CreateTagDto) {
  @Field(() => Int, { description: fieldsDescriptions.id })
  @MaxLength(maxCharLengthList.default)
  id: number;
}
