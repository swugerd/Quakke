import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Monitoring {
  @Field(() => Int)
  viewsCount: number;

  @Field(() => Int)
  likesCount: number;

  @Field(() => Int)
  dislikesCount: number;

  @Field(() => Int)
  commentsCount: number;

  @Field(() => Int)
  subscribersCount: number;
}
