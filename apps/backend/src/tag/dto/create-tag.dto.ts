import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import fieldsDescriptions from '../../constants/fields.descriptions';

@InputType()
export class CreateTagDto {
  @Field(() => String, { description: fieldsDescriptions.tag.name })
  @MaxLength(maxCharLengthList.default)
  name: string;
}
