import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateVideoDto } from './create-video.dto';

@InputType()
export class UpdateVideoDto extends PartialType(CreateVideoDto) {
  @Field(() => Int)
  id: number;
}
