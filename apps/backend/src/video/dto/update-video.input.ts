import { CreateVideoInput } from './create-video.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVideoInput extends PartialType(CreateVideoInput) {
  @Field(() => Int)
  id: number;
}
