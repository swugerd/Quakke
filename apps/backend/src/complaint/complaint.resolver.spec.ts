import { Test, TestingModule } from '@nestjs/testing';
import { ComplaintResolver } from './complaint.resolver';
import { ComplaintService } from './complaint.service';

describe('ComplaintResolver', () => {
  let resolver: ComplaintResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComplaintResolver, ComplaintService],
    }).compile();

    resolver = module.get<ComplaintResolver>(ComplaintResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
