import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommentDto {
  @Field(() => String)
  text: string;

  @Field(() => Int)
  videoId: number;

  @Field(() => Int, { nullable: true })
  parentId: number;
}
