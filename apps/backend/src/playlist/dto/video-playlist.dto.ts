import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class VideoPlaylistDto {
  @Field(() => Int, { description: 'Unique playlist id to add video' })
  playlistId: number;

  @Field(() => Int, { description: 'Unique video id to add in playlist' })
  videoId: number;
}
