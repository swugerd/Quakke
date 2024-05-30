import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { SubCategoryService } from './sub-category.service';

describe('SubCategoryService', () => {
  let service: SubCategoryService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    subCategory: {
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
        SubCategoryService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<SubCategoryService>(SubCategoryService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
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
        .spyOn(prismaService.subCategory, 'create')
        .mockResolvedValue(createdSubCategory);

      expect(await service.create(dto)).toEqual(createdSubCategory);
    });
  });

  describe('findAll', () => {
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

      jest.spyOn(service, 'findAll').mockResolvedValue(subCategories);

      expect(await service.findAll()).toEqual(subCategories);
    });
  });

  describe('findOne', () => {
    it('should return a sub-category by id', async () => {
      const subCategoryId = 1;

      const subCategory = {
        id: subCategoryId,
        name: 'test sub-category',
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(subCategory);

      expect(await service.findOne(subCategoryId)).toEqual(subCategory);
    });
  });

  describe('update', () => {
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

      jest.spyOn(service, 'update').mockResolvedValue(updatedSubCategory);

      expect(await service.update(subCategoryId, dto)).toEqual(
        updatedSubCategory,
      );
    });
  });

  describe('remove', () => {
    it('should remove a sub-category by id', async () => {
      const subCategoryId = 1;

      const removedSubCategory = {
        id: subCategoryId,
        name: 'test sub-category',
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId: 1,
      };

      jest.spyOn(service, 'remove').mockResolvedValue(removedSubCategory);

      expect(await service.remove(subCategoryId)).toEqual(removedSubCategory);
    });
  });
});
