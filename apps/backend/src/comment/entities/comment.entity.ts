import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { Rating } from '../../rating/entities/rating.entity';
import { User } from '../../user/entities/user.entity';
import { Video } from '../../video/entities/video.entity';

@ObjectType()
export class Comment {
  @Field(() => Int, { description: fieldsDescriptions.id })
  @MaxLength(maxCharLengthList.default)
  id: number;

  @Field(() => GraphQLISODateTime, {
    description: fieldsDescriptions.createdAt,
  })
  @MaxLength(maxCharLengthList.default)
  createdAt: Date;

  @Field(() => GraphQLISODateTime, {
    description: fieldsDescriptions.createdAt,
  })
  @MaxLength(maxCharLengthList.default)
  updatedAt: Date;

  @Field(() => String, { description: fieldsDescriptions.comment.text })
  text: string;

  @Field(() => User, { description: 'Comment author' })
  user: () => User;

  @Field(() => Video, { description: 'Video for which a comment was left' })
  video: () => Video;

  @Field(() => Comment, { nullable: true, description: 'Parent comment' })
  parent?: Comment;

  @Field(() => [Comment], { nullable: true, description: 'Comment replies' })
  replies?: Comment[];

  @Field(() => [Rating], { nullable: true, description: 'Comment likes' })
  likes?: Rating[];

  @Field(() => [Rating], { nullable: true, description: 'Comment dislikes' })
  dislikes?: Rating[];
}
