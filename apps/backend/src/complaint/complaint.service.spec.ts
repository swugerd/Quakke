import { Test, TestingModule } from '@nestjs/testing';
import { ComplaintReasons } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ComplaintService } from './complaint.service';

const complaintData = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  user: null,
  videoId: null,
  video: null,
};

describe('ComplaintService', () => {
  let service: ComplaintService;

  const mockPrismaService = {
    complaint: {
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
        ComplaintService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ComplaintService>(ComplaintService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create complaint', async () => {
      const dto = {
        message: 'message',
        reason: ComplaintReasons.RACISM,
        userId: 1,
      };

      const createdComplaint = {
        ...dto,
        ...complaintData,
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdComplaint);

      expect(await service.create(dto)).toEqual(createdComplaint);
    });
  });

  describe('findAll', () => {
    it('should return an array of complaints', async () => {
      const complaints = [
        {
          ...complaintData,
          message: 'message',
          reason: ComplaintReasons.RACISM,
          userId: 1,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(complaints);

      expect(await service.findAll()).toEqual(complaints);
    });
  });

  describe('findOne', () => {
    it('should return a complaint by id', async () => {
      const complaintId = 1;

      const complaint = {
        ...complaintData,
        id: complaintId,
        message: 'message',
        reason: ComplaintReasons.RACISM,
        userId: 1,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(complaint);

      expect(await service.findOne(complaintId)).toEqual(complaint);
    });
  });

  describe('update', () => {
    it('should update a complaint by id', async () => {
      const complaintId = 1;

      const dto = {
        id: complaintId,
        message: 'message',
        reason: ComplaintReasons.RACISM,
        userId: 1,
        ...complaintData,
      };

      const updatedComplaint = {
        ...complaintData,
        ...dto,
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedComplaint);

      expect(await service.update(complaintId, dto)).toEqual(updatedComplaint);
    });
  });

  describe('remove', () => {
    it('should remove a complaint by id', async () => {
      const complaintId = 1;

      const removedComplaint = {
        id: complaintId,
        message: 'message',
        reason: ComplaintReasons.RACISM,
        userId: 1,
        ...complaintData,
      };

      jest.spyOn(service, 'remove').mockResolvedValue(removedComplaint);

      expect(await service.remove(complaintId)).toEqual(removedComplaint);
    });
  });
});
