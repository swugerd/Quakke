import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesResolver } from './sub-categories.resolver';

@Module({
  providers: [SubCategoriesResolver, SubCategoriesService],
})
export class SubCategoriesModule {}
