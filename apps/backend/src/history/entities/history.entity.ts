import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { Video } from '../../video/entities/video.entity';
import { User } from './../../user/entities/user.entity';

@ObjectType()
export class History {
  @Field(() => Int, { description: fieldsDescriptions.id })
  id: number;

  @Field(() => GraphQLISODateTime, {
    description: fieldsDescriptions.createdAt,
  })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, {
    description: fieldsDescriptions.updatedAt,
  })
  updatedAt: Date;

  @Field(() => Video, { description: fieldsDescriptions.history.video })
  video: Video;

  @Field(() => User, { description: fieldsDescriptions.history.user })
  user: () => User;

  @Field(() => Int, { description: fieldsDescriptions.history.time })
  time: number;
}
