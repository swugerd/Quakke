import { Field, InputType } from '@nestjs/graphql';
import { Roles } from '@prisma/client';

@InputType()
export class CreateRoleDto {
  @Field(() => Roles)
  name: Roles;
}
