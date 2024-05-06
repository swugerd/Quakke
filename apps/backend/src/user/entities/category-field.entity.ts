import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/categories/entities/category.entity';

@ObjectType()
export class SelectedCategory {
  @Field(() => Category)
  category: Category;
}
