import {
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Privacy } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Setting {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => Privacy)
  privacy: Privacy;

  @Field(() => User)
  user: User;
}

registerEnumType(Privacy, {
  name: 'Privacy',
});
