import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { VideoFile, VideoPreview } from '@prisma/client';
import { Category } from '../../category/entities/category.entity';
import { Comment } from '../../comment/entities/comment.entity';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { Rating } from '../../rating/entities/rating.entity';
import { SubCategory } from '../../sub-category/entities/sub-category.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { FileEntity } from '../../utils/entities/file.entity';
import { User } from './../../user/entities/user.entity';

@ObjectType()
export class Video {
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

  @Field(() => String, { description: fieldsDescriptions.video.name })
  name: string;

  @Field(() => String, {
    nullable: true,
    description: fieldsDescriptions.video.description,
  })
  description?: string;

  @Field(() => Boolean, { description: fieldsDescriptions.video.description })
  isBanned: boolean;

  @Field(() => User, { description: fieldsDescriptions.video.author })
  author: () => User;

  @Field(() => FileEntity, { description: fieldsDescriptions.video.file })
  videoFile: VideoFile;

  @Field(() => FileEntity, {
    nullable: true,
    description: fieldsDescriptions.video.preview,
  })
  videoPreview?: VideoPreview;

  @Field(() => Category, {
    nullable: true,
    description: fieldsDescriptions.video.category,
  })
  category?: Category;

  @Field(() => SubCategory, {
    nullable: true,
    description: fieldsDescriptions.video.subCategory,
  })
  subCategory?: SubCategory;

  @Field(() => [Tag], {
    nullable: true,
    description: fieldsDescriptions.video.tags,
  })
  tags?: Tag[];

  @Field(() => [Comment], {
    nullable: true,
    description: fieldsDescriptions.video.comments,
  })
  comments?: Comment[];

  @Field(() => [Rating], {
    nullable: true,
    description: fieldsDescriptions.video.likes,
  })
  likes?: Rating[];

  @Field(() => [Rating], {
    nullable: true,
    description: fieldsDescriptions.video.dislikes,
  })
  dislikes?: Rating[];
}
