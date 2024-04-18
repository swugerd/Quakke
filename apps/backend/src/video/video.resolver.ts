import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators';
import { JwtPayload } from 'src/auth/interfaces';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { Video } from './entities/video.entity';
import { VideoService } from './video.service';

@Resolver(() => Video)
export class VideoResolver {
  constructor(private readonly videoService: VideoService) {}

  @Mutation(() => Video)
  createVideo(
    @Args('createVideoInput') createVideoInput: CreateVideoInput,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.videoService.create(createVideoInput, user);
  }

  @Query(() => [Video])
  getVideos() {
    return this.videoService.findAll();
  }

  @Query(() => Video)
  getVideo(@Args('id', { type: () => Int }) id: number) {
    return this.videoService.findOne(id);
  }

  @Mutation(() => Video)
  updateVideo(@Args('updateVideoInput') updateVideoInput: UpdateVideoInput) {
    return this.videoService.update(updateVideoInput.id, updateVideoInput);
  }

  @Mutation(() => Video)
  removeVideo(@Args('id', { type: () => Int }) id: number) {
    return this.videoService.remove(id);
  }
}
