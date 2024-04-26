import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { BannerImage, BannerTypes, BannerVideo } from '@prisma/client';
import { BannerTypeScalar } from 'src/scalars/bannerTypes.scalar';
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

  @Field(() => BannerTypeScalar, {
    description: 'VIDEO | STREAM | IMAGE',
  })
  type: BannerTypes;

  @Field(() => FileEntity)
  bannerImage: BannerImage;

  @Field(() => FileEntity, { nullable: true })
  bannerVideo?: BannerVideo;

  @Field(() => User)
  user: User;
}
