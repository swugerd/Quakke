import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { CreateCommentDto } from './create-comment.dto';

@InputType()
export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @Field(() => Int, { description: fieldsDescriptions.id })
  id: number;
}
