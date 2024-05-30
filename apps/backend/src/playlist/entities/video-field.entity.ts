import { Field, ObjectType } from '@nestjs/graphql';
import { Video } from '../../video/entities/video.entity';

@ObjectType()
export class VideoPlaylist {
  @Field(() => Video)
  video: Video;
}
