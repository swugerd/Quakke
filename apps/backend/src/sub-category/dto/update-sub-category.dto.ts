import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { CreateSubCategoryDto } from './create-sub-category.dto';

@InputType()
export class UpdateSubCategoryDto extends PartialType(CreateSubCategoryDto) {
  @Field(() => Int, { description: fieldsDescriptions.id })
  @MaxLength(maxCharLengthList.default)
  id: number;
}
