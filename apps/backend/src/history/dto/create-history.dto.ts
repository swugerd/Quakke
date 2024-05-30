import { Field, InputType, Int } from '@nestjs/graphql';
import fieldsDescriptions from '../../constants/fields.descriptions';

@InputType()
export class CreateHistoryDto {
  @Field(() => Int, { description: fieldsDescriptions.history.video })
  videoId: number;

  @Field(() => Int, { description: fieldsDescriptions.history.time })
  time: number;
}
