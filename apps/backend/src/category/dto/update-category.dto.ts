import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateCategoryDto } from './create-category.dto';

@InputType()
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @Field(() => Int)
  id: number;
}
