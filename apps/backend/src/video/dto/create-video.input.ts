import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateVideoInput {
  @Field(() => String)
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  videoId: number;

  @Field(() => Int, { nullable: true })
  categoryId: number;

  @Field(() => Int, { nullable: true })
  subCategoryId: number;
}
