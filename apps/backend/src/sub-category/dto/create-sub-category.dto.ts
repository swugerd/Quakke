import { Field, InputType, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from 'src/constants';
import fieldsDescriptions from 'src/constants/fields.descriptions';

@InputType()
export class CreateSubCategoryDto {
  @Field(() => String, { description: fieldsDescriptions.subCategory.name })
  @MaxLength(maxCharLengthList.default)
  name: string;

  @Field(() => Int, { description: 'Parent category' })
  @MaxLength(maxCharLengthList.default)
  categoryId: number;
}
