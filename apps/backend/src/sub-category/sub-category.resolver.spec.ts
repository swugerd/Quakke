import { Test, TestingModule } from '@nestjs/testing';
import { SubCategoryResolver } from './sub-category.resolver';
import { SubCategoryService } from './sub-category.service';

describe('SubCategoryResolver', () => {
  let resolver: SubCategoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubCategoryResolver, SubCategoryService],
    }).compile();

    resolver = module.get<SubCategoryResolver>(SubCategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
