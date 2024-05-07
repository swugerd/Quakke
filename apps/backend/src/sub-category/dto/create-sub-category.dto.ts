import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSubCategoryDto {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  categoryId: number;
}
