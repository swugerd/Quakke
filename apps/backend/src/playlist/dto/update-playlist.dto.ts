import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import fieldsDescriptions from 'src/constants/fields.descriptions';
import { CreatePlaylistDto } from './create-playlist.dto';

@InputType()
export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto) {
  @Field(() => Int, { description: fieldsDescriptions.id })
  id: number;
}
