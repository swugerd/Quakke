import { Test, TestingModule } from '@nestjs/testing';
import { Roles } from '@prisma/client';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from '../auth/interfaces';

const commentData = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  user: null,
  video: null,
  dislikes: [],
  likes: [],
  replies: [],
  parent: null,
  parentId: null,
  userId: null,
};

describe('CommentService', () => {
  let service: CommentService;

  const mockPrismaService = {
    comment: {
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
        CommentService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create comment', async () => {
      const dto: CreateCommentDto = {
        text: 'text',
        videoId: 1,
      };

      const user: JwtPayload = {
        email: 'mail@mail.ru',
        id: 1,
        role: Roles.ADMIN,
      };

      const createdComment = {
        ...dto,
        ...commentData,
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdComment);

      expect(await service.create(dto, user)).toEqual(createdComment);
    });
  });

  describe('findAll', () => {
    it('should return an array of comments', async () => {
      const comments = [{ ...commentData, text: 'text', videoId: 1 }];

      jest.spyOn(service, 'findAll').mockResolvedValue(comments);

      expect(await service.findAll()).toEqual(comments);
    });
  });

  describe('findOne', () => {
    it('should return a comment by id', async () => {
      const commentId = 1;

      const comment = {
        ...commentData,
        id: commentId,
        videoId: 1,
        text: 'text',
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(comment);

      expect(await service.findOne(commentId)).toEqual(comment);
    });
  });

  describe('update', () => {
    it('should update a comment by id', async () => {
      const commentId = 1;

      const dto = {
        id: commentId,
        text: 'text',
        videoId: 1,
        ...commentData,
      };

      const updatedComment = {
        ...commentData,
        ...dto,
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedComment);

      expect(await service.update(commentId, dto)).toEqual(updatedComment);
    });
  });

  describe('remove', () => {
    it('should remove a comment by id', async () => {
      const commentId = 1;

      const removedComment = {
        ...commentData,
        id: commentId,
        text: 'text',
        videoId: 1,
      };

      jest.spyOn(service, 'remove').mockResolvedValue(removedComment);

      expect(await service.remove(commentId)).toEqual(removedComment);
    });
  });
});
