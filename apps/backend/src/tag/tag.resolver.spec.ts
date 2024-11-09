import { Test, TestingModule } from '@nestjs/testing';
import { Tag } from '@prisma/client';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagResolver } from './tag.resolver';
import { TagService } from './tag.service';

describe('TagResolver', () => {
  let resolver: TagResolver;

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
        TagResolver,
        {
          provide: TagService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    resolver = module.get<TagResolver>(TagResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createTag', () => {
    it('should create tag', async () => {
      const dto: CreateTagDto = { name: 'test tag' };

      const createdTag: Tag = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...dto,
      };

      jest.spyOn(resolver, 'createTag').mockResolvedValue(createdTag);

      expect(await resolver.createTag(dto)).toEqual(createdTag);
    });
  });

  describe('getTags', () => {
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

      jest.spyOn(resolver, 'getTags').mockResolvedValue(tags);

      expect(await resolver.getTags()).toEqual(tags);
    });
  });

  describe('getTag', () => {
    it('should return a tag by id', async () => {
      const tagId = 1;

      const tag: Tag = {
        id: tagId,
        name: 'test tag',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(resolver, 'getTag').mockResolvedValue(tag);

      expect(await resolver.getTag(tagId)).toEqual(tag);
    });
  });

  describe('updateTag', () => {
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

      jest.spyOn(resolver, 'updateTag').mockResolvedValue(updatedTag as Tag);

      expect(await resolver.updateTag(dto)).toEqual(updatedTag);
    });
  });

  describe('removeTag', () => {
    it('should remove a tag by id', async () => {
      const tagId = 1;

      const removedTag: Tag = {
        id: tagId,
        name: 'test tag',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(resolver, 'removeTag').mockResolvedValue(removedTag);

      expect(await resolver.removeTag(tagId)).toEqual(removedTag);
    });
  });
});
