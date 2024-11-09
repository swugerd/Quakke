import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { PartnerRequestStatuses } from '@prisma/client';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { CreatePartnerRequestDto } from './create-partner-request.dto';

@InputType()
export class UpdatePartnerRequestDto extends PartialType(
  CreatePartnerRequestDto,
) {
  @Field(() => Int, { description: fieldsDescriptions.id })
  id: number;

  @Field(() => PartnerRequestStatuses, {
    nullable: true,
    description: fieldsDescriptions.partnerRequest.status,
  })
  status?: PartnerRequestStatuses;
}
