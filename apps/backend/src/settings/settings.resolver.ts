import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators';
import { JwtPayload } from '../auth/interfaces';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from './entities/setting.entity';
import { SettingsService } from './settings.service';

@Resolver(() => Setting)
export class SettingsResolver {
  constructor(private readonly settingsService: SettingsService) {}

  @Mutation(() => Setting)
  createSettings(@Args('dto') dto: CreateSettingDto) {
    return this.settingsService.create(dto);
  }

  @Query(() => [Setting])
  getSettings() {
    return this.settingsService.findAll();
  }

  @Query(() => Setting)
  getSettingsById(@Args('id', { type: () => Int }) id: number) {
    return this.settingsService.findOne(id);
  }

  @Query(() => Setting)
  getUserSettings(@CurrentUser() user: JwtPayload) {
    return this.settingsService.findOne(undefined, user.id);
  }

  @Mutation(() => Setting)
  updateSettings(@Args('dto') dto: UpdateSettingDto) {
    return this.settingsService.update(dto);
  }

  @Mutation(() => Setting)
  removeSettings(@Args('id', { type: () => Int }) id: number) {
    return this.settingsService.remove(id);
  }
}
