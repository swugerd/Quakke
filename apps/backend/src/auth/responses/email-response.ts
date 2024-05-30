import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmailResponse {
  @Field(() => String, { description: 'Response message' })
  message: string;
}
