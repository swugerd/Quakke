import { Field, GraphQLISODateTime, InputType, Int } from '@nestjs/graphql';
import { BannerTypes } from '@prisma/client';
import { BannerTypeScalar } from 'src/scalars/bannerTypes.scalar';

@InputType()
export class CreateBannerInput {
  @Field(() => GraphQLISODateTime, { nullable: true })
  publishDate?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  unpublishDate?: Date;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => BannerTypeScalar, {
    description: 'VIDEO | STREAM | IMAGE',
  })
  type: BannerTypes;

  @Field(() => Int)
  bannerImageId: number;

  @Field(() => Int, { nullable: true })
  bannerVideoId?: number;
}
