import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, Max, Min } from 'class-validator';

@InputType()
export class PaginationDto {
  @Field(() => Int)
  @IsNumber()
  @Min(0)
  limit: number;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  @Max(100)
  offset: number = 100;
}
