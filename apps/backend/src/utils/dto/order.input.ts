import { Field, InputType } from '@nestjs/graphql';
import { IsIn } from 'class-validator';

@InputType()
export class OrderInput {
  @Field({ nullable: true })
  orderBy?: string;

  @Field({ nullable: true })
  @IsIn(['asc', 'desc'])
  orderDirection?: string = 'asc';
}
