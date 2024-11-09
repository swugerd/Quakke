import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Roles } from '@prisma/client';
import fieldsDescriptions from '../../constants/fields.descriptions';

@ObjectType()
export class ProfileResponse {
  @Field(() => Int, { description: fieldsDescriptions.id })
  id: number;

  @Field(() => String, { description: fieldsDescriptions.user.email })
  email: string;

  @Field(() => Roles, { description: fieldsDescriptions.role.name })
  role: Roles;
}
