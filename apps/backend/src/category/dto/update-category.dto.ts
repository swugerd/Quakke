import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { CreateCategoryDto } from './create-category.dto';

@InputType()
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @Field(() => Int, { description: fieldsDescriptions.id })
  id: number;
}
