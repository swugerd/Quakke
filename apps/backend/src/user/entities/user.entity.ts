import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field()
  email: string;

  @Field()
  login: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  password: string;

  @Field()
  isBanned: boolean;

  @Field()
  isPartner: boolean;
}
