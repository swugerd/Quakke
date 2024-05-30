import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { SubCategory } from '../../sub-category/entities/sub-category.entity';

@ObjectType()
export class Category {
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

  @Field(() => String, { description: fieldsDescriptions.category.name })
  name: string;

  @Field(() => [SubCategory], { description: 'Sub categories' })
  subCategories: SubCategory[];
}
