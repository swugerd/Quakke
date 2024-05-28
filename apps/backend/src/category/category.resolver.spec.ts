import { Test, TestingModule } from '@nestjs/testing';
import { Category } from '@prisma/client';
import { PaginatedData } from 'src/types';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { CategoriesQuerySearchDto } from './dto/query-search.dto';

describe('CategoryResolver', () => {
  let resolver: CategoryResolver;

  const mockPrismaService = {
    create: jest.fn(),
    findAll: jest.fn(),
    getAllWithQuery: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryResolver,
        {
          provide: CategoryService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    resolver = module.get<CategoryResolver>(CategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createCategory', () => {
    it('should create a new category', async () => {
      const dto = {
        name: 'test category',
      };

      const createdCategory = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...dto,
      };

      jest.spyOn(resolver, 'createCategory').mockResolvedValue(createdCategory);

      expect(await resolver.createCategory(dto)).toEqual(createdCategory);
    });
  });

  describe('getCategories', () => {
    it('should return an array of categories', async () => {
      const categories = [
        {
          id: 1,
          name: 'test category 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          subCategories: [],
        },
        {
          id: 2,
          name: 'test category 2',
          createdAt: new Date(),
          updatedAt: new Date(),
          subCategories: [],
        },
      ];

      jest.spyOn(resolver, 'getCategories').mockResolvedValue(categories);

      expect(await resolver.getCategories()).toEqual(categories);
    });
  });

  describe('getCategoriesWithQuery', () => {
    it('shoud return a paginated array of categories', async () => {
      const query: CategoriesQuerySearchDto = {
        limit: 10,
        offset: 0,
      };

      const categories: PaginatedData<Category> = {
        count: 1,
        data: [
          {
            id: 1,
            name: 'test category 1',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            name: 'test category 2',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      };

      jest
        .spyOn(resolver, 'getCategoriesWithQuery')
        .mockResolvedValue(categories);

      expect(await resolver.getCategoriesWithQuery(query)).toEqual(categories);
    });
  });

  describe('getCategory', () => {
    it('should return a category by id', async () => {
      const categoryId = 1;

      const category = {
        id: categoryId,
        name: 'test category',
        createdAt: new Date(),
        updatedAt: new Date(),
        subCategories: [],
      };

      jest.spyOn(resolver, 'getCategory').mockResolvedValue(category);

      expect(await resolver.getCategory(categoryId)).toEqual(category);
    });
  });

  describe('updateCategory', () => {
    it('should update a category by id', async () => {
      const categoryId = 1;

      const dto = {
        id: categoryId,
        name: 'test category',
      };

      const updatedCategory = {
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
        subCategories: [],
      };

      jest.spyOn(resolver, 'updateCategory').mockResolvedValue(updatedCategory);

      expect(await resolver.updateCategory(dto)).toEqual(updatedCategory);
    });
  });

  describe('removeCategory', () => {
    it('should remove a category by id', async () => {
      const categoryId = 1;

      const removedCategory = {
        id: categoryId,
        name: 'test category',
        createdAt: new Date(),
        updatedAt: new Date(),
        subCategories: [],
      };

      jest.spyOn(resolver, 'removeCategory').mockResolvedValue(removedCategory);

      expect(await resolver.removeCategory(categoryId)).toEqual(
        removedCategory,
      );
    });
  });
});
