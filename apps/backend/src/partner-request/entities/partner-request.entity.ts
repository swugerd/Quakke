import {
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { PartnerRequestStatuses } from '@prisma/client';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class PartnerRequest {
  @Field(() => Int, { description: fieldsDescriptions.id })
  id: number;

  @Field(() => GraphQLISODateTime, {
    description: fieldsDescriptions.createdAt,
  })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, {
    description: fieldsDescriptions.updatedAt,
  })
  updatedAt: Date;

  @Field(() => String, {
    description: fieldsDescriptions.partnerRequest.message,
  })
  message: string;

  @Field(() => PartnerRequestStatuses, {
    description: fieldsDescriptions.partnerRequest.status,
  })
  status: PartnerRequestStatuses;

  @Field(() => User, { description: fieldsDescriptions.partnerRequest.user })
  user: () => User;
}

registerEnumType(PartnerRequestStatuses, {
  name: 'PartnerRequestStatuses',
});
