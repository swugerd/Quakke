import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators';
import { JwtPayload } from 'src/auth/interfaces';
import { FileInput } from 'src/utils/dto/file.input';
import { FileEntity } from 'src/utils/entities/file.entity';
import { BannerService } from './banner.service';
import { CreateBannerInput } from './dto/create-banner.input';
import { UpdateBannerInput } from './dto/update-banner.input';
import { Banner } from './entities/banner.entity';

@Resolver(() => Banner)
export class BannerResolver {
  constructor(private readonly bannerService: BannerService) {}

  @Mutation(() => Banner)
  createBanner(
    @Args('createBannerInput') createBannerInput: CreateBannerInput,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.bannerService.create(createBannerInput, user);
  }

  @Mutation(() => FileEntity)
  uploadBannerVideo(@Args('file') file: FileInput) {
    return this.bannerService.uploadFile(file, 'VIDEOS');
  }

  @Mutation(() => FileEntity)
  dropBannerVideo(@Args('id', { type: () => Int }) id: number) {
    return this.bannerService.deleteFile(id, 'VIDEOS');
  }

  @Mutation(() => FileEntity)
  uploadBannerImage(@Args('file') file: FileInput) {
    return this.bannerService.uploadFile(file, 'IMAGES');
  }

  @Mutation(() => FileEntity)
  dropBannerImage(@Args('id', { type: () => Int }) id: number) {
    return this.bannerService.deleteFile(id, 'IMAGES');
  }

  @Query(() => [Banner])
  getBanners() {
    return this.bannerService.findAll();
  }

  @Query(() => Banner)
  getBanner(@Args('id', { type: () => Int }) id: number) {
    return this.bannerService.findOne(id);
  }

  @Mutation(() => Banner)
  updateBanner(
    @Args('updateBannerInput') updateBannerInput: UpdateBannerInput,
  ) {
    return this.bannerService.update(updateBannerInput.id, updateBannerInput);
  }

  @Mutation(() => Banner)
  removeBanner(@Args('id', { type: () => Int }) id: number) {
    return this.bannerService.remove(id);
  }
}
