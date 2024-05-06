import { Test, TestingModule } from '@nestjs/testing';
import { PartnerRequestResolver } from './partner-request.resolver';
import { PartnerRequestService } from './partner-request.service';

describe('PartnerRequestResolver', () => {
  let resolver: PartnerRequestResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartnerRequestResolver, PartnerRequestService],
    }).compile();

    resolver = module.get<PartnerRequestResolver>(PartnerRequestResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
