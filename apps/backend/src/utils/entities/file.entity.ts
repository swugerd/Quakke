import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { pathFinderMiddleware } from '../../middlewares/pathfinder.middleware';

@ObjectType()
export class FileEntity {
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

  @Field({
    middleware: [pathFinderMiddleware],
    description: 'Url to static path',
  })
  url: string;

  @Field(() => Int, { description: 'File size in bytes' })
  size: number;

  @Field(() => String, { description: 'File extenstion' })
  extension: string;
}
