import {
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { ComplaintReasons } from '@prisma/client';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { User } from '../../user/entities/user.entity';
import { Video } from '../../video/entities/video.entity';

@ObjectType()
export class Complaint {
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

  @Field(() => ComplaintReasons, {
    description: fieldsDescriptions.complaint.reason,
  })
  reason: ComplaintReasons;

  @Field(() => String, { description: fieldsDescriptions.complaint.message })
  message: string;

  @Field(() => User, {
    nullable: true,
    description: fieldsDescriptions.complaint.user,
  })
  user?: () => User;

  @Field(() => Video, {
    nullable: true,
    description: fieldsDescriptions.complaint.video,
  })
  video?: Video;
}

registerEnumType(ComplaintReasons, {
  name: 'ComplaintReasons',
});
