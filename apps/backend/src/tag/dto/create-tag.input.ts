import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTagInput {
  @Field()
  name: string;

  @Field(() => Int)
  videoId: number;
}
