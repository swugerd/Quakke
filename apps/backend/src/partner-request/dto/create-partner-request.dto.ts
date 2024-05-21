import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePartnerRequestDto {
  @Field(() => String)
  message: string;
}
