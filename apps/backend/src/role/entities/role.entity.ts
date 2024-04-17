import {
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Roles } from '@prisma/client';

@ObjectType()
export class Role {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt: Date;

  @Field(() => Roles)
  name: Roles;
}

registerEnumType(Roles, {
  name: 'Roles',
});
