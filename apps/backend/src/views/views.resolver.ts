import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators';
import { JwtPayload } from 'src/auth/interfaces';
import { CreateViewInput } from './dto/create-view.input';
import { UpdateViewInput } from './dto/update-view.input';
import { View } from './entities/view.entity';
import { ViewsService } from './views.service';

@Resolver(() => View)
export class ViewsResolver {
  constructor(private readonly viewsService: ViewsService) {}

  @Mutation(() => View)
  createView(
    @Args('createViewInput') createViewInput: CreateViewInput,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.viewsService.create(createViewInput, user);
  }

  @Query(() => [View])
  getViews() {
    return this.viewsService.findAll();
  }

  @Query(() => View)
  getView(@Args('id', { type: () => Int }) id: number) {
    return this.viewsService.findOne(id);
  }

  @Mutation(() => View)
  updateView(@Args('updateViewInput') updateViewInput: UpdateViewInput) {
    return this.viewsService.update(updateViewInput.id, updateViewInput);
  }

  @Mutation(() => View)
  removeView(@Args('id', { type: () => Int }) id: number) {
    return this.viewsService.remove(id);
  }
}
