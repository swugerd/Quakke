import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators';
import { JwtPayload } from '../auth/interfaces';
import { FileDto } from '../utils/dto/file.dto';
import { FileEntity } from '../utils/entities/file.entity';
import { CreateVideoDto } from './dto/create-video.dto';
import { VideoQuerySearchDto } from './dto/query-search.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoPagination } from './entities/video-pagination.entity';
import { Video } from './entities/video.entity';
import { VideoService } from './video.service';

@Resolver(() => Video)
export class VideoResolver {
  constructor(private readonly videoService: VideoService) {}

  @Mutation(() => Video)
  createVideo(
    @Args('dto') dto: CreateVideoDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.videoService.create(dto, user);
  }

  @Mutation(() => FileEntity)
  uploadVideo(@Args('file') file: FileDto) {
    return this.videoService.uploadFile(file, 'VIDEOS');
  }

  @Mutation(() => FileEntity)
  dropVideo(@Args('id', { type: () => Int }) id: number) {
    return this.videoService.deleteFile(id, 'VIDEOS');
  }

  @Mutation(() => FileEntity)
  uploadPreview(@Args('file') file: FileDto) {
    return this.videoService.uploadFile(file, 'IMAGES');
  }

  @Mutation(() => FileEntity)
  dropPreview(@Args('id', { type: () => Int }) id: number) {
    return this.videoService.deleteFile(id, 'IMAGES');
  }

  @Query(() => [Video])
  getVideos() {
    return this.videoService.findAll();
  }

  @Query(() => VideoPagination)
  getVideosWithQuery(@Args('query') query: VideoQuerySearchDto) {
    return this.videoService.getAllWithQuery(query);
  }

  @Query(() => Video)
  getVideo(@Args('id', { type: () => Int }) id: number) {
    return this.videoService.findOne(id);
  }

  @Mutation(() => Video)
  updateVideo(@Args('dto') dto: UpdateVideoDto) {
    return this.videoService.update(dto.id, dto);
  }

  @Mutation(() => Video)
  removeVideo(@Args('id', { type: () => Int }) id: number) {
    return this.videoService.remove(id);
  }
}
