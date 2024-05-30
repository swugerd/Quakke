import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import fieldsDescriptions from 'src/constants/fields.descriptions';
import { CreateRoleDto } from './create-role.dto';

@InputType()
export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @Field(() => Int, { description: fieldsDescriptions.id })
  id: number;
}
