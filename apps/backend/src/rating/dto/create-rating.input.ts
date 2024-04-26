import { Field, InputType, Int } from '@nestjs/graphql';
import { RatingScalar } from 'src/scalars/rating.scalar';
import { LikeType } from 'src/types';

@InputType()
export class CreateRatingInput {
  @Field(() => Int, { nullable: true })
  videoId?: number;

  @Field(() => Int, { nullable: true })
  commentId?: number;

  @Field(() => RatingScalar, { description: 'like | dislike' })
  type: LikeType;
}
