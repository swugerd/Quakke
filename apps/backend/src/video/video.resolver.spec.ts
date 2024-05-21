import { Test, TestingModule } from '@nestjs/testing';
import { VideoResolver } from './video.resolver';
import { VideoService } from './video.service';

describe('VideoResolver', () => {
  let resolver: VideoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoResolver, VideoService],
    }).compile();

    resolver = module.get<VideoResolver>(VideoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
