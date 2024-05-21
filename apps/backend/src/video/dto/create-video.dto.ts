import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateVideoDto {
  @Field(() => String)
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  videoFileId: number;

  @Field(() => Int, { nullable: true })
  videoPreviewId?: number;

  @Field(() => Int, { nullable: true })
  categoryId?: number;

  @Field(() => Int, { nullable: true })
  subCategoryId?: number;
}
