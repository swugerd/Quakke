import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { pathFinderMiddleware } from 'src/middlewares/pathfinder.middleware';

@ObjectType()
export class FileEntity {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field({ middleware: [pathFinderMiddleware] })
  url: string;

  @Field(() => Int)
  size: number;

  @Field()
  extension: string;
}
