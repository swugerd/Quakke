import { Test, TestingModule } from '@nestjs/testing';
import { BannerResolver } from './banner.resolver';
import { BannerService } from './banner.service';

describe('BannerResolver', () => {
  let resolver: BannerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BannerResolver, BannerService],
    }).compile();

    resolver = module.get<BannerResolver>(BannerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
