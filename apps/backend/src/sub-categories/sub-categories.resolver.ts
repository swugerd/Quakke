import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSubCategoryInput } from './dto/create-sub-category.input';
import { UpdateSubCategoryInput } from './dto/update-sub-category.input';
import { SubCategory } from './entities/sub-category.entity';
import { SubCategoriesService } from './sub-categories.service';

@Resolver(() => SubCategory)
export class SubCategoriesResolver {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Mutation(() => SubCategory)
  createSubCategory(
    @Args('createSubCategoryInput')
    createSubCategoryInput: CreateSubCategoryInput,
  ) {
    return this.subCategoriesService.create(createSubCategoryInput);
  }

  @Query(() => [SubCategory])
  getSubCategories() {
    return this.subCategoriesService.findAll();
  }

  @Query(() => SubCategory)
  getSubCategory(@Args('id', { type: () => Int }) id: number) {
    return this.subCategoriesService.findOne(id);
  }

  @Mutation(() => SubCategory)
  updateSubCategory(
    @Args('updateSubCategoryInput')
    updateSubCategoryInput: UpdateSubCategoryInput,
  ) {
    return this.subCategoriesService.update(
      updateSubCategoryInput.id,
      updateSubCategoryInput,
    );
  }

  @Mutation(() => SubCategory)
  removeSubCategory(@Args('id', { type: () => Int }) id: number) {
    return this.subCategoriesService.remove(id);
  }
}
