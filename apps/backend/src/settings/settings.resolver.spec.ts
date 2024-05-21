import { Test, TestingModule } from '@nestjs/testing';
import { SettingsResolver } from './settings.resolver';
import { SettingsService } from './settings.service';

describe('SettingsResolver', () => {
  let resolver: SettingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SettingsResolver, SettingsService],
    }).compile();

    resolver = module.get<SettingsResolver>(SettingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
