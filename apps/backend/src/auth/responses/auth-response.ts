import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  @Field(() => String, { description: 'Token for user authentication' })
  accessToken: string;
}
