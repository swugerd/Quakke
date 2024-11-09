import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { CreateUserDto } from './create-user.dto';

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Field(() => Int, { description: fieldsDescriptions.id })
  id: number;
}
