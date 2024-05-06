import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { PartnerRequestStatuses } from '@prisma/client';
import { CreatePartnerRequestInput } from './create-partner-request.input';

@InputType()
export class UpdatePartnerRequestInput extends PartialType(
  CreatePartnerRequestInput,
) {
  @Field(() => Int)
  id: number;

  @Field(() => PartnerRequestStatuses, { nullable: true })
  status?: PartnerRequestStatuses;
}
