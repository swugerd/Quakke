import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NewTokenResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
