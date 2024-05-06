import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePartnerRequestInput {
  @Field(() => String)
  message: string;
}
