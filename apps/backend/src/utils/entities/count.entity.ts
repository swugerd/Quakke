import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CountEntity {
  @Field(() => Int, { description: 'Total count of records' })
  count: number;
}
