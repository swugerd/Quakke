import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from 'src/constants';

@InputType()
export class SignInDto {
  @Field(() => String, {
    description: 'Credentials for login (login or email)',
  })
  @MaxLength(maxCharLengthList.default)
  credentials: string;

  @Field(() => String, { description: 'Password for login' })
  @MaxLength(maxCharLengthList.default)
  password: string;
}
