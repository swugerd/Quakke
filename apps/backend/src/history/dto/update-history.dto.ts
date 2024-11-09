import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { CreateHistoryDto } from './create-history.dto';

@InputType()
export class UpdateHistoryDto extends PartialType(CreateHistoryDto) {
  @Field(() => Int, { description: fieldsDescriptions.id })
  id: number;
}
