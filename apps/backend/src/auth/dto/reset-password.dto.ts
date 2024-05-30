import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNumberString, MaxLength } from 'class-validator';
import { maxCharLengthList } from 'src/constants';

@InputType()
export class ResetPasswordDto {
  @Field(() => String, { description: 'Email to change user password' })
  @IsEmail()
  @MaxLength(maxCharLengthList.default)
  email: string;

  @Field(() => String, { description: 'New user password' })
  @MaxLength(maxCharLengthList.default)
  newPassword: string;

  @Field(() => String, { description: 'Confirmation code' })
  @IsNumberString()
  @MaxLength(maxCharLengthList.passwordResetToken)
  token: string;
}
