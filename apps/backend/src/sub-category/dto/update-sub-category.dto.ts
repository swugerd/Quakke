import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateSubCategoryDto } from './create-sub-category.dto';

@InputType()
export class UpdateSubCategoryDto extends PartialType(CreateSubCategoryDto) {
  @Field(() => Int)
  id: number;
}
