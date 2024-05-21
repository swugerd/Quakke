import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateRatingDto } from './create-rating.dto';

@InputType()
export class UpdateRatingDto extends PartialType(CreateRatingDto) {
  @Field(() => Int)
  id: number;
}
