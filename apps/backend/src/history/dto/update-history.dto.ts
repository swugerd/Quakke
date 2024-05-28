import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateHistoryDto } from './create-history.dto';

@InputType()
export class UpdateHistoryDto extends PartialType(CreateHistoryDto) {
  @Field(() => Int)
  id: number;
}
