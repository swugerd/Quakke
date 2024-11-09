import { Test, TestingModule } from '@nestjs/testing';
import { Roles } from '@prisma/client';
import { JwtPayload } from '../auth/interfaces';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { HistoryService } from './history.service';

const historyData = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  video: null,
  user: null,
  userId: null,
};

describe('HistoryService', () => {
  let service: HistoryService;

  const mockPrismaService = {
    videoHistory: {
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
        HistoryService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<HistoryService>(HistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
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

      jest.spyOn(service, 'create').mockResolvedValue(createdHistory);

      expect(await service.create(dto, user)).toEqual(createdHistory);
    });
  });

  describe('findAll', () => {
    it('should return an array of video history', async () => {
      const history = [{ ...historyData, videoId: 1, time: 123 }];

      const user: JwtPayload = {
        email: 'mail@mail.ru',
        id: 1,
        role: Roles.ADMIN,
      };

      jest.spyOn(service, 'findAll').mockResolvedValue(history);

      expect(await service.findAll(user)).toEqual(history);
    });
  });

  describe('update', () => {
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

      jest.spyOn(service, 'update').mockResolvedValue(updatedHistory);

      expect(await service.update(historyId, dto)).toEqual(updatedHistory);
    });
  });

  describe('remove', () => {
    it('should remove a video history by id', async () => {
      const historyId = 1;

      const removedHistory = {
        ...historyData,
        id: historyId,
        videoId: 1,
        time: 123,
      };

      jest.spyOn(service, 'remove').mockResolvedValue(removedHistory);

      expect(await service.remove(historyId)).toEqual(removedHistory);
    });
  });

  describe('removeAll', () => {
    it('should remove all video history by id', async () => {
      const user: JwtPayload = {
        email: 'mail@mail.ru',
        id: 1,
        role: Roles.ADMIN,
      };

      const count = {
        count: 123,
      };

      jest.spyOn(service, 'removeAll').mockResolvedValue(count);

      expect(await service.removeAll(user)).toEqual(count);
    });
  });
});
