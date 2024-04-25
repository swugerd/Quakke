import { Test, TestingModule } from '@nestjs/testing';
import { ViewsResolver } from './views.resolver';
import { ViewsService } from './views.service';

describe('ViewsResolver', () => {
  let resolver: ViewsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViewsResolver, ViewsService],
    }).compile();

    resolver = module.get<ViewsResolver>(ViewsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
