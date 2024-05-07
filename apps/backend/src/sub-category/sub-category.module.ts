import { Module } from '@nestjs/common';
import { SubCategoryResolver } from './sub-category.resolver';
import { SubCategoryService } from './sub-category.service';

@Module({
  providers: [SubCategoryResolver, SubCategoryService],
})
export class SubCategoryModule {}
