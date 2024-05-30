import { Field, InputType, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import fieldsDescriptions from '../../constants/fields.descriptions';

@InputType()
export class CreateVideoDto {
  @Field(() => String, { description: fieldsDescriptions.video.name })
  @MaxLength(maxCharLengthList.default)
  name: string;

  @Field(() => String, {
    nullable: true,
    description: fieldsDescriptions.video.description,
  })
  @MaxLength(maxCharLengthList.longText)
  description?: string;

  @Field(() => Int, { description: fieldsDescriptions.videoId })
  @MaxLength(maxCharLengthList.default)
  videoFileId: number;

  @Field(() => Int, {
    nullable: true,
    description: fieldsDescriptions.video.preview,
  })
  @MaxLength(maxCharLengthList.default)
  videoPreviewId?: number;

  @Field(() => Int, {
    nullable: true,
    description: fieldsDescriptions.video.category,
  })
  @MaxLength(maxCharLengthList.default)
  categoryId?: number;

  @Field(() => Int, {
    nullable: true,
    description: fieldsDescriptions.video.subCategory,
  })
  @MaxLength(maxCharLengthList.default)
  subCategoryId?: number;
}
