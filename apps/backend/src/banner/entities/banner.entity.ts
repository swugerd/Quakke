import {
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { BannerImage, BannerTypes, BannerVideo } from '@prisma/client';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { User } from '../../user/entities/user.entity';
import { FileEntity } from '../../utils/entities/file.entity';

@ObjectType()
export class Banner {
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

  @Field(() => GraphQLISODateTime, {
    description: fieldsDescriptions.banner.publishDate,
  })
  publishDate: Date;

  @Field(() => GraphQLISODateTime, {
    description: fieldsDescriptions.banner.unPublishDate,
  })
  unpublishDate: Date;

  @Field(() => String, { description: fieldsDescriptions.banner.title })
  title: string;

  @Field(() => String, {
    nullable: true,
    description: fieldsDescriptions.banner.description,
  })
  description?: string;

  @Field(() => BannerTypes, {
    description: fieldsDescriptions.banner.description,
  })
  type: BannerTypes;

  @Field(() => FileEntity, { description: 'Banner image' })
  bannerImage: BannerImage;

  @Field(() => FileEntity, { nullable: true, description: 'Banner video' })
  bannerVideo?: BannerVideo;

  @Field(() => User, { description: 'User that created banner' })
  user: () => User;
}

registerEnumType(BannerTypes, {
  name: 'BannerTypes',
});
