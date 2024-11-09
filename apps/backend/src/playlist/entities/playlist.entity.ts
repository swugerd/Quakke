import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Privacy } from '@prisma/client';
import { User } from '../..//user/entities/user.entity';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { VideoPlaylist } from './video-field.entity';

@ObjectType()
export class Playlist {
  @Field(() => Int, { description: fieldsDescriptions.id })
  id: number;

  @Field(() => GraphQLISODateTime, {
    description: fieldsDescriptions.createdAt,
  })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, {
    description: fieldsDescriptions.updatedAt,
  })
  updatedAt: Date;

  @Field(() => String, { description: fieldsDescriptions.playlist.name })
  name: string;

  @Field(() => String, { description: fieldsDescriptions.playlist.privacy })
  privacy: Privacy;

  @Field(() => User, { description: fieldsDescriptions.playlist.user })
  user: () => User;

  @Field(() => [VideoPlaylist], {
    nullable: true,
    description: fieldsDescriptions.playlist.videos,
  })
  videos: VideoPlaylist[];
}
