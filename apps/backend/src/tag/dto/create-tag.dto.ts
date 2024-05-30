import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from 'src/constants';
import fieldsDescriptions from 'src/constants/fields.descriptions';

@InputType()
export class CreateTagDto {
  @Field(() => String, { description: fieldsDescriptions.tag.name })
  @MaxLength(maxCharLengthList.default)
  name: string;
}
