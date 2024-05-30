import { Field, InputType, Int } from '@nestjs/graphql';
import { Notifications } from '@prisma/client';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from 'src/constants';
import fieldsDescriptions from 'src/constants/fields.descriptions';

@InputType()
export class CreateNotificationDto {
  @Field(() => Int, {
    nullable: true,
    description: fieldsDescriptions.notification.user,
  })
  @MaxLength(maxCharLengthList.default)
  userId?: number;

  @Field(() => Notifications, {
    description: fieldsDescriptions.notification.type,
  })
  @MaxLength(maxCharLengthList.default)
  type: Notifications;
}
