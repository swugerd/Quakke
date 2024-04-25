import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateViewInput {
  @Field(() => Int)
  videoId: number;
}
