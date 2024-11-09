import { Field, InputType, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import fieldsDescriptions from '../../constants/fields.descriptions';

@InputType()
export class CreateCommentDto {
  @Field(() => String, { description: fieldsDescriptions.comment.text })
  @MaxLength(maxCharLengthList.default)
  text: string;

  @Field(() => Int, { description: fieldsDescriptions.videoId })
  videoId: number;

  @Field(() => Int, {
    nullable: true,
    description: 'Unique id of parent comment',
  })
  parentId?: number;
}
