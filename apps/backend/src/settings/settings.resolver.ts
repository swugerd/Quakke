import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators';
import { JwtPayload } from 'src/auth/interfaces';
import { CreateSettingInput } from './dto/create-setting.input';
import { UpdateSettingInput } from './dto/update-setting.input';
import { Setting } from './entities/setting.entity';
import { SettingsService } from './settings.service';

@Resolver(() => Setting)
export class SettingsResolver {
  constructor(private readonly settingsService: SettingsService) {}

  @Mutation(() => Setting)
  createSettings(
    @Args('createSettingInput') createSettingInput: CreateSettingInput,
  ) {
    return this.settingsService.create(createSettingInput);
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
  updateSettings(
    @Args('updateSettingInput') updateSettingInput: UpdateSettingInput,
  ) {
    return this.settingsService.update(updateSettingInput);
  }

  @Mutation(() => Setting)
  removeSettings(@Args('id', { type: () => Int }) id: number) {
    return this.settingsService.remove(id);
  }
}
