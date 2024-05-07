import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateViewDto {
  @Field(() => Int)
  videoId: number;
}
