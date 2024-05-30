import { Field, InputType, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import fieldsDescriptions from '../../constants/fields.descriptions';

@InputType()
export class CreateViewDto {
  @Field(() => Int, { description: fieldsDescriptions.views.video })
  @MaxLength(maxCharLengthList.default)
  videoId: number;
}
