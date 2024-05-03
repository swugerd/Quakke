import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSettingInput {
  @Field(() => Int)
  userId: number;
}
