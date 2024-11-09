import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { maxCharLengthList } from 'src/constants';

@InputType()
export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'User name' })
  @MaxLength(maxCharLengthList.default)
  name: string;

  @Field(() => String, { description: 'User login' })
  @MaxLength(maxCharLengthList.default)
  login: string;

  @Field(() => String, { description: 'User email' })
  @IsEmail()
  @MaxLength(maxCharLengthList.default)
  email: string;

  @Field(() => String, { description: 'User password' })
  @MaxLength(maxCharLengthList.default)
  password: string;
}
