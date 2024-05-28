import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateTagDto } from './create-tag.dto';

@InputType()
export class UpdateTagDto extends PartialType(CreateTagDto) {
  @Field(() => Int)
  id: number;
}
