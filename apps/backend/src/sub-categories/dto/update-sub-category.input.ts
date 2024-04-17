import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateSubCategoryInput } from './create-sub-category.input';

@InputType()
export class UpdateSubCategoryInput extends PartialType(
  CreateSubCategoryInput,
) {
  @Field(() => Int)
  id: number;
}
