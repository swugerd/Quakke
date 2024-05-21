import { Field, InputType, Int } from '@nestjs/graphql';

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

  @Field(() => Int, { nullable: true })
  userAvatarId?: number;
}
