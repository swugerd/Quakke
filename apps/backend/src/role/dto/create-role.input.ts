import { Field, InputType } from '@nestjs/graphql';
import { Roles } from '@prisma/client';

@InputType()
export class CreateRoleInput {
  @Field(() => Roles)
  name: Roles;
}
