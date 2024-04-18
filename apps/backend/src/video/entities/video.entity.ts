import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Video {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  isBanned: boolean;

  @Field(() => Int)
  userId: number;

  @Field(() => User)
  author: User;
}
