import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Privacy } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';
import { VideoPlaylist } from './video-field.entity';

@ObjectType()
export class Playlist {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => String)
  name: string;

  @Field(() => String)
  privacy: Privacy;

  @Field(() => User)
  user: User;

  @Field(() => [VideoPlaylist], { nullable: true })
  videos: VideoPlaylist[];
}
