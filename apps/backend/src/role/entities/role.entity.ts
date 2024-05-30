import {
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Roles } from '@prisma/client';
import fieldsDescriptions from '../../constants/fields.descriptions';

@ObjectType()
export class Role {
  @Field(() => Int, { description: fieldsDescriptions.id })
  id: number;

  @Field(() => GraphQLISODateTime, {
    description: fieldsDescriptions.createdAt,
  })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: fieldsDescriptions.updatedAt,
  })
  updatedAt: Date;

  @Field(() => Roles, { description: fieldsDescriptions.role.name })
  name: Roles;
}

registerEnumType(Roles, {
  name: 'Roles',
});
