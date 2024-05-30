import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators';
import { JwtPayload } from '../auth/interfaces';
import { LikesType, RatingEnum } from '../types';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';
import { RatingService } from './rating.service';

@Resolver(() => Rating)
export class RatingResolver {
  constructor(private readonly ratingService: RatingService) {}

  @Mutation(() => Rating)
  createRating(
    @Args('dto') dto: CreateRatingDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.ratingService.create(dto, user);
  }

  @Query(() => [Rating])
  getRatings(
    @Args('type', { type: () => RatingEnum })
    type: LikesType,
  ) {
    return this.ratingService.findAll(type);
  }

  @Query(() => Rating)
  getRating(
    @Args('id', { type: () => Int }) id: number,
    @Args('type', { type: () => RatingEnum })
    type: LikesType,
  ) {
    return this.ratingService.findOne(id, type);
  }

  @Mutation(() => Rating)
  updateRating(@Args('dto') dto: UpdateRatingDto) {
    return this.ratingService.update(dto.id, dto);
  }

  @Mutation(() => Rating)
  removeRating(
    @Args('id', { type: () => Int }) id: number,
    @Args('type', { type: () => RatingEnum })
    type: LikesType,
  ) {
    return this.ratingService.remove(id, type);
  }
}
