import { Field, InputType, Int } from '@nestjs/graphql';
import { Notifications } from '@prisma/client';

@InputType()
export class CreateNotificationDto {
  @Field(() => Int, { nullable: true })
  userId?: number;

  @Field(() => Notifications)
  type: Notifications;
}
