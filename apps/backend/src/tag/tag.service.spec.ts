import { Test, TestingModule } from '@nestjs/testing';
import { Tag } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagService } from './tag.service';

describe('TagService', () => {
  let service: TagService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    tag: {
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
        TagService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TagService>(TagService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create tag', async () => {
      const dto: CreateTagDto = { name: 'test tag' };

      const createdTag: Tag = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...dto,
      };

      jest.spyOn(prismaService.tag, 'create').mockResolvedValue(createdTag);

      expect(await service.create(dto)).toEqual(createdTag);
    });
  });

  describe('findAll', () => {
    it('should return an array of tags', async () => {
      const tags: Tag[] = [
        {
          id: 1,
          name: 'test tag 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'test tag 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(tags);

      expect(await service.findAll()).toEqual(tags);
    });
  });

  describe('findOne', () => {
    it('should return a tag by id', async () => {
      const tagId = 1;

      const tag: Tag = {
        id: tagId,
        name: 'test tag',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(tag);

      expect(await service.findOne(tagId)).toEqual(tag);
    });
  });

  describe('update', () => {
    it('should update a tag by id', async () => {
      const tagId = 1;

      const dto: UpdateTagDto = {
        id: tagId,
        name: 'test tag',
      };

      const updatedTag = {
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedTag as Tag);

      expect(await service.update(tagId, dto)).toEqual(updatedTag);
    });
  });

  describe('remove', () => {
    it('should remove a tag by id', async () => {
      const tagId = 1;

      const removedTag: Tag = {
        id: tagId,
        name: 'test tag',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'remove').mockResolvedValue(removedTag);

      expect(await service.remove(tagId)).toEqual(removedTag);
    });
  });
});
