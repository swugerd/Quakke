import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTagDto {
  @Field(() => String)
  name: string;
}
