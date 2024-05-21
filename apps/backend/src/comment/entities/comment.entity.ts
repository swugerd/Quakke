import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Rating } from 'src/rating/entities/rating.entity';
import { User } from 'src/user/entities/user.entity';
import { Video } from 'src/video/entities/video.entity';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => String)
  text: string;

  @Field(() => User)
  user: () => User;

  @Field(() => Video)
  video: () => Video;

  @Field(() => Comment, { nullable: true })
  parent?: Comment;

  @Field(() => [Comment], { nullable: true })
  replies?: Comment[];

  @Field(() => [Rating], { nullable: true })
  likes?: Rating[];

  @Field(() => [Rating], { nullable: true })
  dislikes?: Rating[];
}
