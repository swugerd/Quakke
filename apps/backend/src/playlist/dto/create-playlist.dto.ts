import { Field, InputType } from '@nestjs/graphql';
import fieldsDescriptions from '../../constants/fields.descriptions';

@InputType()
export class CreatePlaylistDto {
  @Field(() => String, { description: fieldsDescriptions.playlist.name })
  name: string;
}
