import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateVideoInput {
  @Field(() => String)
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  videoId: number;
}
