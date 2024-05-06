import {
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { PartnerRequestStatuses } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class PartnerRequest {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => String)
  message: string;

  @Field(() => PartnerRequestStatuses)
  status: PartnerRequestStatuses;

  @Field(() => User)
  user: User;
}

registerEnumType(PartnerRequestStatuses, {
  name: 'PartnerRequestStatuses',
});
