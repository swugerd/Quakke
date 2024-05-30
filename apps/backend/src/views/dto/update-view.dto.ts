import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { CreateViewDto } from './create-view.dto';

@InputType()
export class UpdateViewDto extends PartialType(CreateViewDto) {
  @Field(() => Int, { description: fieldsDescriptions.id })
  @MaxLength(maxCharLengthList.default)
  id: number;

  @Field(() => Int, { description: fieldsDescriptions.views.user })
  @MaxLength(maxCharLengthList.default)
  userId: number;
}
