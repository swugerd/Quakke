import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { CreateNotificationDto } from './create-notification.dto';

@InputType()
export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @Field(() => Int, { description: fieldsDescriptions.id })
  id: number;
}
