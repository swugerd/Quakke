import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  login: string;

  @Field()
  name: string;

  @Field()
  password: string;
}
