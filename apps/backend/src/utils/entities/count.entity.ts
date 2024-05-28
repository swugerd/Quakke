import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CountEntity {
  @Field(() => Int)
  count: number;
}
