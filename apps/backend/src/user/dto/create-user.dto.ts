import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field(() => String)
  email: string;

  @Field(() => String)
  login: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;
}
