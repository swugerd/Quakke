import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, Max, Min } from 'class-validator';

@InputType()
export class PaginationDto {
  @Field(() => Int, { description: 'Limit of records to show' })
  @Min(0)
  limit: number;

  @Field(() => Int, { description: 'Number of records to skip from 0' })
  @IsNumber()
  @Max(100)
  offset: number = 100;
}
