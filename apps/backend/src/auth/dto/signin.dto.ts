import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  credentials: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;
}
