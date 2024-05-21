import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { SubCategory } from 'src/sub-category/entities/sub-category.entity';

@ObjectType()
export class Category {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt: Date;

  @Field(() => String)
  name: string;

  @Field(() => [SubCategory])
  subCategories: SubCategory[];
}
