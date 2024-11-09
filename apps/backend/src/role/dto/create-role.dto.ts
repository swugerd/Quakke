import { Field, InputType } from '@nestjs/graphql';
import { Roles } from '@prisma/client';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import fieldsDescriptions from '../../constants/fields.descriptions';

@InputType()
export class CreateRoleDto {
  @Field(() => Roles, { description: fieldsDescriptions.role.name })
  @MaxLength(maxCharLengthList.default)
  name: Roles;
}
