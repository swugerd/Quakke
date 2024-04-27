import {
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Notifications } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Notification {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => Notifications)
  type: Notifications;

  @Field(() => User, { nullable: true })
  user?: User;
}

registerEnumType(Notifications, {
  name: 'Notifications',
});
