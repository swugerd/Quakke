import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { User } from '../../user/entities/user.entity';
import { Video } from '../../video/entities/video.entity';

@ObjectType()
export class View {
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

  @Field(() => User, { description: fieldsDescriptions.views.user })
  user: User;

  @Field(() => Video, { description: fieldsDescriptions.views.video })
  video: Video;
}
