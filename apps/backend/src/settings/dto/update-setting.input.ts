import { Field, InputType, Int } from '@nestjs/graphql';
import { Privacy } from '@prisma/client';

@InputType()
export class UpdateSettingInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  userId?: number;

  @Field(() => Privacy, { nullable: true })
  privacy: Privacy;
}
