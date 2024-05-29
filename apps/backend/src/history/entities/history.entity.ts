import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Video } from 'src/video/entities/video.entity';
import { User } from './../../user/entities/user.entity';

@ObjectType()
export class History {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => Video)
  video: Video;

  @Field(() => User)
  user: () => User;

  @Field(() => Int)
  time: number;
}
