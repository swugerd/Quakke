import { Test, TestingModule } from '@nestjs/testing';
import { PartnerRequestService } from './partner-request.service';

describe('PartnerRequestService', () => {
  let service: PartnerRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartnerRequestService],
    }).compile();

    service = module.get<PartnerRequestService>(PartnerRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
