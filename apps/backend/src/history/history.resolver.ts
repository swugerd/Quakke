import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators';
import { JwtPayload } from '../auth/interfaces';
import { CountEntity } from '../utils/entities/count.entity';
import { CreateHistoryDto } from './dto/create-history.dto';
import { HistoryQuerySearchDto } from './dto/query-search.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { HistoryPagination } from './entities/history-pagination.entity';
import { History } from './entities/history.entity';
import { HistoryService } from './history.service';

@Resolver(() => History)
export class HistoryResolver {
  constructor(private readonly historyService: HistoryService) {}

  @Mutation(() => History)
  createHistory(
    @Args('dto') dto: CreateHistoryDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.historyService.create(dto, user);
  }

  @Query(() => [History])
  getHistory(@CurrentUser() user: JwtPayload) {
    return this.historyService.findAll(user);
  }

  @Query(() => HistoryPagination)
  getHistoryWithQuery(@Args('query') query: HistoryQuerySearchDto) {
    return this.historyService.getAllWithQuery(query);
  }

  @Mutation(() => History)
  updateHistory(@Args('dto') updateHistoryInput: UpdateHistoryDto) {
    return this.historyService.update(
      updateHistoryInput.id,
      updateHistoryInput,
    );
  }

  @Mutation(() => History)
  removeHistory(@Args('id', { type: () => Int }) id: number) {
    return this.historyService.remove(id);
  }

  @Mutation(() => CountEntity)
  removeAllHistory(@CurrentUser() user: JwtPayload) {
    return this.historyService.removeAll(user);
  }
}
