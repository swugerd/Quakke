import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateRoleDto } from './create-role.dto';

@InputType()
export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @Field(() => Int)
  id: number;
}
