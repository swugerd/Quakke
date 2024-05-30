import {
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Notifications } from '@prisma/client';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Notification {
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

  @Field(() => Notifications, {
    description: fieldsDescriptions.notification.type,
  })
  type: Notifications;

  @Field(() => User, {
    nullable: true,
    description: fieldsDescriptions.notification.user,
  })
  user?: () => User;
}

registerEnumType(Notifications, {
  name: 'Notifications',
});
