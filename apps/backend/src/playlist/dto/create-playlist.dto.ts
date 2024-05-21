import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePlaylistDto {
  @Field(() => String)
  name: string;
}
