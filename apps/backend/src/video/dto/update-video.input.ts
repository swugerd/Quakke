import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateVideoInput } from './create-video.input';

@InputType()
export class UpdateVideoInput extends PartialType(CreateVideoInput) {
  @Field(() => Int)
  id: number;
}
