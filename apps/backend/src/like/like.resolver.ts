import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators';
import { JwtPayload } from 'src/auth/interfaces';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { Like } from './entities/like.entity';
import { LikeService } from './like.service';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Mutation(() => Like)
  createLike(
    @Args('createLikeInput') createLikeInput: CreateLikeInput,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.likeService.create(createLikeInput, user);
  }

  @Query(() => [Like])
  getLikes() {
    return this.likeService.findAll();
  }

  @Query(() => Like)
  getLike(@Args('id', { type: () => Int }) id: number) {
    return this.likeService.findOne(id);
  }

  @Mutation(() => Like)
  updateLike(@Args('updateLikeInput') updateLikeInput: UpdateLikeInput) {
    return this.likeService.update(updateLikeInput.id, updateLikeInput);
  }

  @Mutation(() => Like)
  removeLike(@Args('id', { type: () => Int }) id: number) {
    return this.likeService.remove(id);
  }
}
