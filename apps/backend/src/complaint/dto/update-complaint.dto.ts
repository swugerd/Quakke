import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { CreateComplaintDto } from './create-complaint.dto';

@InputType()
export class UpdateComplaintDto extends PartialType(CreateComplaintDto) {
  @Field(() => Int, { description: fieldsDescriptions.id })
  id: number;
}
