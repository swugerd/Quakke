import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSubCategoryInput {
  @Field()
  name: string;

  @Field(() => Int)
  categoryId: number;
}
