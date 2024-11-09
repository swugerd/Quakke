import { Field, GraphQLISODateTime, InputType, Int } from '@nestjs/graphql';
import { BannerTypes } from '@prisma/client';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import fieldsDescriptions from '../../constants/fields.descriptions';

@InputType()
export class CreateBannerDto {
  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: fieldsDescriptions.banner.publishDate,
  })
  @MaxLength(maxCharLengthList.default)
  publishDate?: Date;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
    description: fieldsDescriptions.banner.unPublishDate,
  })
  @MaxLength(maxCharLengthList.default)
  unpublishDate?: Date;

  @Field(() => String, { description: fieldsDescriptions.banner.title })
  @MaxLength(maxCharLengthList.default)
  title: string;

  @Field(() => String, {
    nullable: true,
    description: fieldsDescriptions.banner.description,
  })
  @MaxLength(maxCharLengthList.default)
  description?: string;

  @Field(() => BannerTypes, {
    description: fieldsDescriptions.banner.type,
  })
  @MaxLength(maxCharLengthList.default)
  type: BannerTypes;

  @Field(() => Int, { description: fieldsDescriptions.imageId })
  @MaxLength(maxCharLengthList.default)
  bannerImageId: number;

  @Field(() => Int, {
    nullable: true,
    description: fieldsDescriptions.videoId,
  })
  @MaxLength(maxCharLengthList.default)
  bannerVideoId?: number;
}
