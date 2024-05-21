import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesQuerySearchDto } from './dto/query-search.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryPagination } from './entities/category-pagination.entity';
import { Category } from './entities/category.entity';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  createCategory(@Args('dto') dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Query(() => [Category])
  getCategories() {
    return this.categoryService.findAll();
  }

  @Query(() => CategoryPagination)
  getCategoriesWithQuery(@Args('query') query: CategoriesQuerySearchDto) {
    return this.categoryService.getAllWithQuery(query);
  }

  @Query(() => Category)
  getCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => Category)
  updateCategory(@Args('dto') dto: UpdateCategoryDto) {
    return this.categoryService.update(dto.id, dto);
  }

  @Mutation(() => Category)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.remove(id);
  }
}
