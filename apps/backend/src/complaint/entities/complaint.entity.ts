import {
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { ComplaintReasons } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';
import { Video } from 'src/video/entities/video.entity';

@ObjectType()
export class Complaint {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => ComplaintReasons)
  reason: ComplaintReasons;

  @Field(() => String)
  message: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Video, { nullable: true })
  video?: Video;
}

registerEnumType(ComplaintReasons, {
  name: 'ComplaintReasons',
});
