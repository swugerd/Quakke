import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/comment/entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import { Video } from 'src/video/entities/video.entity';

@ObjectType()
export class Like {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Video, { nullable: true })
  video?: Video;

  @Field(() => Comment, { nullable: true })
  comment?: Comment;
}
