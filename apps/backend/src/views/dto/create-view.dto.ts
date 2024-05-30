import { Field, InputType, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from 'src/constants';
import fieldsDescriptions from 'src/constants/fields.descriptions';

@InputType()
export class CreateViewDto {
  @Field(() => Int, { description: fieldsDescriptions.views.video })
  @MaxLength(maxCharLengthList.default)
  videoId: number;
}
