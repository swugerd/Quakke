import {
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { BannerImage, BannerTypes, BannerVideo } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';
import { FileEntity } from 'src/utils/entities/file.entity';

@ObjectType()
export class Banner {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => GraphQLISODateTime)
  publishDate: Date;

  @Field(() => GraphQLISODateTime)
  unpublishDate: Date;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => BannerTypes)
  type: BannerTypes;

  @Field(() => FileEntity)
  bannerImage: BannerImage;

  @Field(() => FileEntity, { nullable: true })
  bannerVideo?: BannerVideo;

  @Field(() => User)
  user: () => User;
}

registerEnumType(BannerTypes, {
  name: 'BannerTypes',
});
