import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export function Pagination<T>(ItemType: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PageClass {
    @Field(() => [ItemType], { description: 'List of records' })
    data: T[];

    @Field(() => Int, { description: 'Total count of records' })
    count: number;
  }

  return PageClass;
}
