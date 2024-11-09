import { Field, InputType, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import fieldsDescriptions from '../../constants/fields.descriptions';

@InputType()
export class CreateUserDto {
  @Field(() => String, { description: fieldsDescriptions.user.email })
  @MaxLength(maxCharLengthList.default)
  email: string;

  @Field(() => String, { description: fieldsDescriptions.user.login })
  @MaxLength(maxCharLengthList.default)
  login: string;

  @Field(() => String, { description: fieldsDescriptions.user.name })
  @MaxLength(maxCharLengthList.default)
  name: string;

  @Field(() => String, { description: fieldsDescriptions.user.password })
  @MaxLength(maxCharLengthList.default)
  password: string;

  @Field(() => Int, {
    nullable: true,
    description: fieldsDescriptions.user.avatar,
  })
  @MaxLength(maxCharLengthList.default)
  userAvatarId?: number;
}
