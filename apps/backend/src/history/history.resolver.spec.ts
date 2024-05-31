import { Test, TestingModule } from '@nestjs/testing';
import { Roles } from '@prisma/client';
import { JwtPayload } from '../auth/interfaces';
import { CreateHistoryDto } from './dto/create-history.dto';
import { HistoryResolver } from './history.resolver';
import { HistoryService } from './history.service';

const historyData = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  video: null,
  user: null,
  userId: null,
};

describe('HistoryResolver', () => {
  let resolver: HistoryResolver;

  const mockHistoryService = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    removeAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryResolver,
        {
          provide: HistoryService,
          useValue: mockHistoryService,
        },
      ],
    }).compile();

    resolver = module.get<HistoryResolver>(HistoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createHistory', () => {
    it('should create video history', async () => {
      const dto: CreateHistoryDto = {
        videoId: 1,
        time: 123,
      };

      const user: JwtPayload = {
        email: 'mail@mail.ru',
        id: 1,
        role: Roles.ADMIN,
      };

      const createdHistory = {
        ...dto,
        ...historyData,
      };

      jest.spyOn(resolver, 'createHistory').mockResolvedValue(createdHistory);

      expect(await resolver.createHistory(dto, user)).toEqual(createdHistory);
    });
  });

  describe('getHistory', () => {
    it('should return an array of video history', async () => {
      const history = [{ ...historyData, videoId: 1, time: 123 }];

      const user: JwtPayload = {
        email: 'mail@mail.ru',
        id: 1,
        role: Roles.ADMIN,
      };

      jest.spyOn(resolver, 'getHistory').mockResolvedValue(history);

      expect(await resolver.getHistory(user)).toEqual(history);
    });
  });

  describe('updateHistory', () => {
    it('should update a video history by id', async () => {
      const historyId = 1;

      const dto = {
        id: historyId,
        videoId: 1,
        time: 123,
        ...historyData,
      };

      const updatedHistory = {
        ...historyData,
        ...dto,
      };

      jest.spyOn(resolver, 'updateHistory').mockResolvedValue(updatedHistory);

      expect(await resolver.updateHistory(dto)).toEqual(updatedHistory);
    });
  });

  describe('removeHistory', () => {
    it('should remove a video history by id', async () => {
      const historyId = 1;

      const removedHistory = {
        ...historyData,
        id: historyId,
        videoId: 1,
        time: 123,
      };

      jest.spyOn(resolver, 'removeHistory').mockResolvedValue(removedHistory);

      expect(await resolver.removeHistory(historyId)).toEqual(removedHistory);
    });
  });

  describe('removeAllHistory', () => {
    it('should remove all video history by id', async () => {
      const user: JwtPayload = {
        email: 'mail@mail.ru',
        id: 1,
        role: Roles.ADMIN,
      };

      const count = {
        count: 123,
      };

      jest.spyOn(resolver, 'removeAllHistory').mockResolvedValue(count);

      expect(await resolver.removeAllHistory(user)).toEqual(count);
    });
  });
});
