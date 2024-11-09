import { Field, InputType, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import fieldsDescriptions from '../../constants/fields.descriptions';

@InputType()
export class CreateSettingDto {
  @Field(() => Int, { description: fieldsDescriptions.settings.user })
  @MaxLength(maxCharLengthList.default)
  userId: number;
}
