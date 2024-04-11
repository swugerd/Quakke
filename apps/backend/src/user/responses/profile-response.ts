import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileResponse {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  role: string;
}
