import {
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Privacy } from '@prisma/client';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Setting {
  @Field(() => Int, { description: fieldsDescriptions.id })
  id: number;

  @Field(() => GraphQLISODateTime, {
    description: fieldsDescriptions.createdAt,
  })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, {
    description: fieldsDescriptions.updatedAt,
  })
  updatedAt: Date;

  @Field(() => Privacy, { description: fieldsDescriptions.settings.privacy })
  privacy: Privacy;

  @Field(() => User, { description: fieldsDescriptions.settings.user })
  user: () => User;
}

registerEnumType(Privacy, {
  name: 'Privacy',
});
