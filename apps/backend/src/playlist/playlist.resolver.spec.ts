import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistResolver } from './playlist.resolver';
import { PlaylistService } from './playlist.service';

describe('PlaylistResolver', () => {
  let resolver: PlaylistResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaylistResolver, PlaylistService],
    }).compile();

    resolver = module.get<PlaylistResolver>(PlaylistResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
