import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import fieldsDescriptions from '../../constants/fields.descriptions';

@ObjectType()
export class Tag {
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

  @Field(() => String, { description: fieldsDescriptions.tag.name })
  name: string;
}
