import { Test, TestingModule } from '@nestjs/testing';
import { Category } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { PaginatedData } from '../types';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesQuerySearchDto } from './dto/query-search.dto';

describe('CategoryService', () => {
  let service: CategoryService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    category: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create category', async () => {
      const dto: CreateCategoryDto = { name: 'test category' };

      const createdCategory = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...dto,
      };

      jest
        .spyOn(prismaService.category, 'create')
        .mockResolvedValue(createdCategory);

      expect(await service.create(dto)).toEqual(createdCategory);
    });
  });

  describe('findAll', () => {
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

      jest.spyOn(service, 'findAll').mockResolvedValue(categories);

      expect(await service.findAll()).toEqual(categories);
    });
  });

  describe('getAllWithQuery', () => {
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

      jest.spyOn(service, 'getAllWithQuery').mockResolvedValue(categories);

      expect(await service.getAllWithQuery(query)).toEqual(categories);
    });
  });

  describe('findOne', () => {
    it('should return a category by id', async () => {
      const categoryId = 1;

      const category = {
        id: categoryId,
        name: 'test category',
        createdAt: new Date(),
        updatedAt: new Date(),
        subCategories: [],
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(category);

      expect(await service.findOne(categoryId)).toEqual(category);
    });
  });

  describe('update', () => {
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

      jest.spyOn(service, 'update').mockResolvedValue(updatedCategory);

      expect(await service.update(categoryId, dto)).toEqual(updatedCategory);
    });
  });

  describe('remove', () => {
    it('should remove a category by id', async () => {
      const categoryId = 1;

      const removedCategory = {
        id: categoryId,
        name: 'test category',
        createdAt: new Date(),
        updatedAt: new Date(),
        subCategories: [],
      };

      jest.spyOn(service, 'remove').mockResolvedValue(removedCategory);

      expect(await service.remove(categoryId)).toEqual(removedCategory);
    });
  });
});
