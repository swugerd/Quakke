import { Field, InputType } from '@nestjs/graphql';
import fieldsDescriptions from '../../constants/fields.descriptions';

@InputType()
export class CreatePartnerRequestDto {
  @Field(() => String, {
    description: fieldsDescriptions.partnerRequest.message,
  })
  message: string;
}
