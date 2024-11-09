import { Test, TestingModule } from '@nestjs/testing';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { SubCategoryResolver } from './sub-category.resolver';
import { SubCategoryService } from './sub-category.service';

describe('SubCategoryResolver', () => {
  let resolver: SubCategoryResolver;

  const mockPrismaService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubCategoryResolver,
        {
          provide: SubCategoryService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    resolver = module.get<SubCategoryResolver>(SubCategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createSubCategory', () => {
    it('should create sub-category', async () => {
      const dto: CreateSubCategoryDto = {
        name: 'test category',
        categoryId: 1,
      };

      const createdSubCategory = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...dto,
      };

      jest
        .spyOn(resolver, 'createSubCategory')
        .mockResolvedValue(createdSubCategory);

      expect(await resolver.createSubCategory(dto)).toEqual(createdSubCategory);
    });
  });

  describe('getSubCategories', () => {
    it('should return an array of sub-categories', async () => {
      const subCategories = [
        {
          id: 1,
          name: 'test sub-category 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          categoryId: 1,
        },
        {
          id: 2,
          name: 'test sub-category 2',
          createdAt: new Date(),
          updatedAt: new Date(),
          categoryId: 1,
        },
      ];

      jest.spyOn(resolver, 'getSubCategories').mockResolvedValue(subCategories);

      expect(await resolver.getSubCategories()).toEqual(subCategories);
    });
  });

  describe('getSubCategory', () => {
    it('should return a sub-category by id', async () => {
      const subCategoryId = 1;

      const subCategory = {
        id: subCategoryId,
        name: 'test sub-category',
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1,
      };

      jest.spyOn(resolver, 'getSubCategory').mockResolvedValue(subCategory);

      expect(await resolver.getSubCategory(subCategoryId)).toEqual(subCategory);
    });
  });

  describe('updateSubCategory', () => {
    it('should update a sub-category by id', async () => {
      const subCategoryId = 1;

      const dto = {
        id: subCategoryId,
        name: 'test sub-category',
      };

      const updatedSubCategory = {
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1,
      };

      jest
        .spyOn(resolver, 'updateSubCategory')
        .mockResolvedValue(updatedSubCategory);

      expect(await resolver.updateSubCategory(dto)).toEqual(updatedSubCategory);
    });
  });

  describe('removeSubCategory', () => {
    it('should remove a sub-category by id', async () => {
      const subCategoryId = 1;

      const removedSubCategory = {
        id: subCategoryId,
        name: 'test sub-category',
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1,
      };

      jest
        .spyOn(resolver, 'removeSubCategory')
        .mockResolvedValue(removedSubCategory);

      expect(await resolver.removeSubCategory(subCategoryId)).toEqual(
        removedSubCategory,
      );
    });
  });
});
