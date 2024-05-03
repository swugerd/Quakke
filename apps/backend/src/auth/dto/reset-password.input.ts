import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ResetPasswordInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  newPassword: string;

  @Field(() => String)
  token: string;
}
