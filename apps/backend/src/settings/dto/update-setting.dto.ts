import { Field, InputType, Int } from '@nestjs/graphql';
import { Privacy } from '@prisma/client';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import fieldsDescriptions from '../../constants/fields.descriptions';

@InputType()
export class UpdateSettingDto {
  @Field(() => Int, { description: fieldsDescriptions.id })
  @MaxLength(maxCharLengthList.default)
  id: number;

  @Field(() => Int, {
    nullable: true,
    description: fieldsDescriptions.settings.user,
  })
  @MaxLength(maxCharLengthList.default)
  userId?: number;

  @Field(() => Privacy, {
    nullable: true,
    description: fieldsDescriptions.settings.privacy,
  })
  @MaxLength(maxCharLengthList.default)
  privacy: Privacy;
}
