import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreatePlaylistDto } from './create-playlist.dto';

@InputType()
export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
  @Field(() => Int)
  id: number;
}
