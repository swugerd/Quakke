import { Field, InputType } from '@nestjs/graphql';
import { Roles } from '@prisma/client';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from 'src/constants';
import fieldsDescriptions from 'src/constants/fields.descriptions';

@InputType()
export class CreateRoleDto {
  @Field(() => Roles, { description: fieldsDescriptions.role.name })
  @MaxLength(maxCharLengthList.default)
  name: Roles;
}
