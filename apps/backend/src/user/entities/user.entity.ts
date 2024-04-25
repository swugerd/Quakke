import { Field, Int, ObjectType } from '@nestjs/graphql';
import { excludePasswordMiddleware } from 'src/middlewares/exclude-password.middleware';

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

  @Field({ nullable: true, middleware: [excludePasswordMiddleware] })
  password: string;

  @Field()
  isBanned: boolean;

  @Field()
  isPartner: boolean;
}
