import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateHistoryDto {
  @Field(() => Int)
  videoId: number;

  @Field(() => Int)
  time: number;
}
