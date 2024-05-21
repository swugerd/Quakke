import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateTagDto } from './create-tag.input';

@InputType()
export class UpdateTagDto extends PartialType(CreateTagDto) {
  @Field(() => Int)
  id: number;
}
