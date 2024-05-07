import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateViewDto } from './create-view.dto';

@InputType()
export class UpdateViewDto extends PartialType(CreateViewDto) {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;
}
