import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateLikeInput {
  @Field(() => Int, { nullable: true })
  videoId?: number;

  @Field(() => Int, { nullable: true })
  commentId?: number;
}
