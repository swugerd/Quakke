import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { maxCharLengthList } from '../../constants';
import { LikesType, RatingEnum } from '../../types';

@InputType()
export class CreateRatingDto {
  @Field(() => Int, {
    nullable: true,
    description: 'Video for which a rating was left',
  })
  @MaxLength(maxCharLengthList.default)
  videoId?: number;

  @Field(() => Int, {
    nullable: true,
    description: 'Comment for which a rating was left',
  })
  @MaxLength(maxCharLengthList.default)
  commentId?: number;

  @Field(() => RatingEnum, {
    description: `Rating type (${Object.values(RatingEnum).join(' | ')})`,
  })
  @MaxLength(maxCharLengthList.default)
  type: LikesType;
}

registerEnumType(RatingEnum, {
  name: 'RatingEnum',
});
