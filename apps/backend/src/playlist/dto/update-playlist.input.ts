import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreatePlaylistInput } from './create-playlist.input';

@InputType()
export class UpdatePlaylistInput extends PartialType(CreatePlaylistInput) {
  @Field(() => Int)
  id: number;
}
