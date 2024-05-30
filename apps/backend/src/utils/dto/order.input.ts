import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsIn } from 'class-validator';
import { OrderEnum } from '../../types';

@InputType()
export class OrderDto {
  @Field(() => String, {
    nullable: true,
    description: 'Sort field',
  })
  orderBy?: string;

  @Field(() => OrderEnum, {
    nullable: true,
    description: `Sort direction (${Object.values(OrderEnum).join(' | ')})`,
  })
  @IsIn([OrderEnum.ASC, OrderEnum.DESC])
  orderDirection?: OrderEnum = OrderEnum.ASC;
}

registerEnumType(OrderEnum, {
  name: 'OrderEnum',
});
