import { Test, TestingModule } from '@nestjs/testing';
import { StatsResolver } from './stats.resolver';
import { StatsService } from './stats.service';

describe('StatsResolver', () => {
  let resolver: StatsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatsResolver, StatsService],
    }).compile();

    resolver = module.get<StatsResolver>(StatsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
