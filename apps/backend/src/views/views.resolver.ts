import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators';
import { JwtPayload } from 'src/auth/interfaces';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { View } from './entities/view.entity';
import { ViewsService } from './views.service';

@Resolver(() => View)
export class ViewsResolver {
  constructor(private readonly viewsService: ViewsService) {}

  @Mutation(() => View)
  createView(@Args('dto') dto: CreateViewDto, @CurrentUser() user: JwtPayload) {
    return this.viewsService.create(dto, user);
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
  updateView(@Args('dto') dto: UpdateViewDto) {
    return this.viewsService.update(dto.id, dto);
  }

  @Mutation(() => View)
  removeView(@Args('id', { type: () => Int }) id: number) {
    return this.viewsService.remove(id);
  }
}
