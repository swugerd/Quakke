import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { LikesType, RatingEnum } from 'src/types';

@InputType()
export class CreateRatingInput {
  @Field(() => Int, { nullable: true })
  videoId?: number;

  @Field(() => Int, { nullable: true })
  commentId?: number;

  @Field(() => RatingEnum)
  type: LikesType;
}

registerEnumType(RatingEnum, {
  name: 'RatingEnum',
});
