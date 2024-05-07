import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSettingDto {
  @Field(() => Int)
  userId: number;
}
