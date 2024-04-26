import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators';
import { JwtPayload } from 'src/auth/interfaces';
import { RatingScalar } from 'src/scalars/rating.scalar';
import { LikeType } from 'src/types';
import { CreateRatingInput } from './dto/create-rating.input';
import { UpdateRatingInput } from './dto/update-rating.input';
import { Rating } from './entities/rating.entity';
import { RatingService } from './rating.service';

@Resolver(() => Rating)
export class RatingResolver {
  constructor(private readonly ratingService: RatingService) {}

  @Mutation(() => Rating)
  createRating(
    @Args('createRatingInput') createRatingInput: CreateRatingInput,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.ratingService.create(createRatingInput, user);
  }

  @Query(() => [Rating])
  getRatings(
    @Args('type', { type: () => RatingScalar, description: 'like | dislike' })
    type: LikeType,
  ) {
    return this.ratingService.findAll(type);
  }

  @Query(() => Rating)
  getRating(
    @Args('id', { type: () => Int }) id: number,
    @Args('type', { type: () => RatingScalar, description: 'like | dislike' })
    type: LikeType,
  ) {
    return this.ratingService.findOne(id, type);
  }

  @Mutation(() => Rating)
  updateRating(
    @Args('updateRatingInput') updateRatingInput: UpdateRatingInput,
  ) {
    return this.ratingService.update(updateRatingInput.id, updateRatingInput);
  }

  @Mutation(() => Rating)
  removeRating(
    @Args('id', { type: () => Int }) id: number,
    @Args('type', { type: () => RatingScalar, description: 'like | dislike' })
    type: LikeType,
  ) {
    return this.ratingService.remove(id, type);
  }
}
