import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Roles } from '@prisma/client';

@ObjectType()
export class ProfileResponse {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => Roles)
  role: Roles;
}
