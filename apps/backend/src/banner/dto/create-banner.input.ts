import { Field, GraphQLISODateTime, InputType, Int } from '@nestjs/graphql';

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

  // @Field(() => BannerTypes)
  // type: BannerTypes;

  @Field(() => Int)
  bannerImageId: number;

  @Field(() => Int, { nullable: true })
  bannerVideoId?: number;
}
