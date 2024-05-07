import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateNotificationDto } from './create-notification.dto';

@InputType()
export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @Field(() => Int)
  id: number;
}
