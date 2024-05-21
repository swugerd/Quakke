import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/category/entities/category.entity';

@ObjectType()
export class SelectedCategory {
  @Field(() => Category)
  category: Category;
}
