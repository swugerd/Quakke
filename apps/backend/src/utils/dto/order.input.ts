import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsIn } from 'class-validator';
import { OrderEnum } from 'src/types';

@InputType()
export class OrderDto {
  @Field(() => String, { nullable: true })
  orderBy?: string;

  @Field(() => OrderEnum, { nullable: true })
  @IsIn([OrderEnum.ASC, OrderEnum.DESC])
  orderDirection?: OrderEnum = OrderEnum.ASC;
}

registerEnumType(OrderEnum, {
  name: 'OrderEnum',
});
