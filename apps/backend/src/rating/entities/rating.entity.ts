import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class Rating {
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

  @Field(() => User, { description: 'User that created rating' })
  user: () => User;
}
