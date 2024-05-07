import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class VideoPlaylistDto {
  @Field(() => Int)
  playlistId: number;

  @Field(() => Int)
  videoId: number;
}
