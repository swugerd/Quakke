import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmailResponse {
  @Field(() => String)
  message: string;
}
