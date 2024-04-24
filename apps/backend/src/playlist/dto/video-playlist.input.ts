import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class VideoPlaylistInput {
  @Field(() => Int)
  playlistId: number;

  @Field(() => Int)
  videoId: number;
}
