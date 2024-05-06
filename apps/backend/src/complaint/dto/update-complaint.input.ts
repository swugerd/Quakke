import { CreateComplaintInput } from './create-complaint.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateComplaintInput extends PartialType(CreateComplaintInput) {
  @Field(() => Int)
  id: number;
}
