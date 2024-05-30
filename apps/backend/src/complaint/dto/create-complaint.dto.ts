import { Field, InputType, Int } from '@nestjs/graphql';
import { ComplaintReasons } from '@prisma/client';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import fieldsDescriptions from '../../constants/fields.descriptions';

@InputType()
export class CreateComplaintDto {
  @Field(() => ComplaintReasons, {
    description: fieldsDescriptions.complaint.reason,
  })
  @MaxLength(maxCharLengthList.default)
  reason: ComplaintReasons;

  @Field(() => String, {
    description: fieldsDescriptions.complaint.message,
  })
  @MaxLength(maxCharLengthList.longText)
  message: string;

  @Field(() => Int, {
    nullable: true,
    description: fieldsDescriptions.complaint.user,
  })
  userId?: number;

  @Field(() => Int, {
    nullable: true,
    description: fieldsDescriptions.complaint.video,
  })
  videoId?: number;
}
