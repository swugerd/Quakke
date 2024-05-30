import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators';
import { JwtPayload } from '../auth/interfaces';
import { FileDto } from '../utils/dto/file.dto';
import { FileEntity } from '../utils/entities/file.entity';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Banner } from './entities/banner.entity';

@Resolver(() => Banner)
export class BannerResolver {
  constructor(private readonly bannerService: BannerService) {}

  @Mutation(() => Banner)
  createBanner(
    @Args('dto') dto: CreateBannerDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.bannerService.create(dto, user);
  }

  @Mutation(() => FileEntity)
  uploadBannerVideo(@Args('file') file: FileDto) {
    return this.bannerService.uploadFile(file, 'VIDEOS');
  }

  @Mutation(() => FileEntity)
  dropBannerVideo(@Args('id', { type: () => Int }) id: number) {
    return this.bannerService.deleteFile(id, 'VIDEOS');
  }

  @Mutation(() => FileEntity)
  uploadBannerImage(@Args('file') file: FileDto) {
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
  updateBanner(@Args('dto') dto: UpdateBannerDto) {
    return this.bannerService.update(dto.id, dto);
  }

  @Mutation(() => Banner)
  removeBanner(@Args('id', { type: () => Int }) id: number) {
    return this.bannerService.remove(id);
  }
}
