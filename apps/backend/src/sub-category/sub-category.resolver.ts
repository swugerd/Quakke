import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { SubCategory } from './entities/sub-category.entity';
import { SubCategoryService } from './sub-category.service';

@Resolver(() => SubCategory)
export class SubCategoryResolver {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Mutation(() => SubCategory)
  createSubCategory(
    @Args('dto')
    dto: CreateSubCategoryDto,
  ) {
    return this.subCategoryService.create(dto);
  }

  @Query(() => [SubCategory])
  getSubCategories() {
    return this.subCategoryService.findAll();
  }

  @Query(() => SubCategory)
  getSubCategory(@Args('id', { type: () => Int }) id: number) {
    return this.subCategoryService.findOne(id);
  }

  @Mutation(() => SubCategory)
  updateSubCategory(
    @Args('dto')
    dto: UpdateSubCategoryDto,
  ) {
    return this.subCategoryService.update(dto.id, dto);
  }

  @Mutation(() => SubCategory)
  removeSubCategory(@Args('id', { type: () => Int }) id: number) {
    return this.subCategoryService.remove(id);
  }
}
