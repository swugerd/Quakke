import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { VideoFile, VideoPreview } from '@prisma/client';
import { Category } from 'src/categories/entities/category.entity';
import { SubCategory } from 'src/sub-categories/entities/sub-category.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { FileEntity } from 'src/utils/entities/file.entity';
import { User } from './../../user/entities/user.entity';

@ObjectType()
export class Video {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  isBanned: boolean;

  @Field(() => Int)
  userId: number;

  @Field(() => User)
  author: User;

  @Field(() => FileEntity)
  videoFile: VideoFile;

  @Field(() => FileEntity, { nullable: true })
  videoPreview?: VideoPreview;

  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field(() => SubCategory, { nullable: true })
  subCategory?: SubCategory;

  @Field(() => [Tag], { nullable: true })
  tags?: Tag[];
}
