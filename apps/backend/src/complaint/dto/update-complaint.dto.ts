import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateComplaintDto } from './create-complaint.dto';

@InputType()
export class UpdateComplaintDto extends PartialType(CreateComplaintDto) {
  @Field(() => Int)
  id: number;
}
