import { Test, TestingModule } from '@nestjs/testing';
import { Roles } from '@prisma/client';
import { JwtPayload } from 'src/auth/interfaces';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

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

describe('CommentResolver', () => {
  let resolver: CommentResolver;

  const mockCommentService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentResolver,
        { provide: CommentService, useValue: mockCommentService },
      ],
    }).compile();

    resolver = module.get<CommentResolver>(CommentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createComment', () => {
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

      jest.spyOn(resolver, 'createComment').mockResolvedValue(createdComment);

      expect(await resolver.createComment(dto, user)).toEqual(createdComment);
    });
  });

  describe('getComments', () => {
    it('should return an array of comments', async () => {
      const comments = [{ ...commentData, text: 'text', videoId: 1 }];

      jest.spyOn(resolver, 'getComments').mockResolvedValue(comments);

      expect(await resolver.getComments()).toEqual(comments);
    });
  });

  describe('getComment', () => {
    it('should return a comment by id', async () => {
      const commentId = 1;

      const comment = {
        ...commentData,
        id: commentId,
        videoId: 1,
        text: 'text',
      };

      jest.spyOn(resolver, 'getComment').mockResolvedValue(comment);

      expect(await resolver.getComment(commentId)).toEqual(comment);
    });
  });

  describe('updateComment', () => {
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

      jest.spyOn(resolver, 'updateComment').mockResolvedValue(updatedComment);

      expect(await resolver.updateComment(dto)).toEqual(updatedComment);
    });
  });

  describe('removeComment', () => {
    it('should remove a comment by id', async () => {
      const commentId = 1;

      const removedComment = {
        ...commentData,
        id: commentId,
        text: 'text',
        videoId: 1,
      };

      jest.spyOn(resolver, 'removeComment').mockResolvedValue(removedComment);

      expect(await resolver.removeComment(commentId)).toEqual(removedComment);
    });
  });
});
