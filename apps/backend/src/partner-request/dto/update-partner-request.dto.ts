import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { PartnerRequestStatuses } from '@prisma/client';
import { CreatePartnerRequestDto } from './create-partner-request.dto';

@InputType()
export class UpdatePartnerRequestDto extends PartialType(
  CreatePartnerRequestDto,
) {
  @Field(() => Int)
  id: number;

  @Field(() => PartnerRequestStatuses, { nullable: true })
  status?: PartnerRequestStatuses;
}
