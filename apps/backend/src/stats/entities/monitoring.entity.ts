import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Monitoring {
  @Field(() => Int, { description: 'Channel views count' })
  viewsCount: number;

  @Field(() => Int, { description: 'Channel likes count' })
  likesCount: number;

  @Field(() => Int, { description: 'Channel dislikes count' })
  dislikesCount: number;

  @Field(() => Int, { description: 'Channel comments count' })
  commentsCount: number;

  @Field(() => Int, { description: 'Channel subscribers count' })
  subscribersCount: number;
}
