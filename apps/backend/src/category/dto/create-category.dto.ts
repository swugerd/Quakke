import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import fieldsDescriptions from '../../constants/fields.descriptions';

@InputType()
export class CreateCategoryDto {
  @Field(() => String, { description: fieldsDescriptions.category.name })
  @MaxLength(maxCharLengthList.default)
  name: string;
}
