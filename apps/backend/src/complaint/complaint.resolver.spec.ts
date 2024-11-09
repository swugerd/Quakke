import { Test, TestingModule } from '@nestjs/testing';
import { ComplaintReasons } from '@prisma/client';
import { ComplaintResolver } from './complaint.resolver';
import { ComplaintService } from './complaint.service';

const complaintData = {
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  user: null,
  videoId: null,
  video: null,
};

describe('ComplaintResolver', () => {
  let resolver: ComplaintResolver;

  const mockComplaintService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComplaintResolver,
        {
          provide: ComplaintService,
          useValue: mockComplaintService,
        },
      ],
    }).compile();

    resolver = module.get<ComplaintResolver>(ComplaintResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createComplaint', () => {
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

      jest
        .spyOn(resolver, 'createComplaint')
        .mockResolvedValue(createdComplaint);

      expect(await resolver.createComplaint(dto)).toEqual(createdComplaint);
    });
  });

  describe('getComplaints', () => {
    it('should return an array of complaints', async () => {
      const complaints = [
        {
          ...complaintData,
          message: 'message',
          reason: ComplaintReasons.RACISM,
          userId: 1,
        },
      ];

      jest.spyOn(resolver, 'getComplaints').mockResolvedValue(complaints);

      expect(await resolver.getComplaints()).toEqual(complaints);
    });
  });

  describe('getComplaint', () => {
    it('should return a complaint by id', async () => {
      const complaintId = 1;

      const complaint = {
        ...complaintData,
        id: complaintId,
        message: 'message',
        reason: ComplaintReasons.RACISM,
        userId: 1,
      };

      jest.spyOn(resolver, 'getComplaint').mockResolvedValue(complaint);

      expect(await resolver.getComplaint(complaintId)).toEqual(complaint);
    });
  });

  describe('updateComplaint', () => {
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

      jest
        .spyOn(resolver, 'updateComplaint')
        .mockResolvedValue(updatedComplaint);

      expect(await resolver.updateComplaint(dto)).toEqual(updatedComplaint);
    });
  });

  describe('removeComplaint', () => {
    it('should remove a complaint by id', async () => {
      const complaintId = 1;

      const removedComplaint = {
        id: complaintId,
        message: 'message',
        reason: ComplaintReasons.RACISM,
        userId: 1,
        ...complaintData,
      };

      jest
        .spyOn(resolver, 'removeComplaint')
        .mockResolvedValue(removedComplaint);

      expect(await resolver.removeComplaint(complaintId)).toEqual(
        removedComplaint,
      );
    });
  });
});
