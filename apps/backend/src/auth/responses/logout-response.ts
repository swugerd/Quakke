import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LogoutResponse {
  @Field(() => Boolean, { description: 'Operation status' })
  success: boolean;
}
