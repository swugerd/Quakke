import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateViewInput } from './create-view.input';

@InputType()
export class UpdateViewInput extends PartialType(CreateViewInput) {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;
}
