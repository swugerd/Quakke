import { Field, InputType, Int } from '@nestjs/graphql';
import { Notifications } from '@prisma/client';

@InputType()
export class CreateNotificationInput {
  @Field(() => Int, { nullable: true })
  userId?: number;

  @Field(() => Notifications)
  type: Notifications;
}
