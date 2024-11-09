import { Query, Resolver } from '@nestjs/graphql';
import { Monitoring } from './entities/monitoring.entity';
import { StatsService } from './stats.service';
import { CurrentUser } from '../auth/decorators';
import { JwtPayload } from '../auth/interfaces';

@Resolver(() => Monitoring)
export class StatsResolver {
  constructor(private readonly statsService: StatsService) {}

  @Query(() => Monitoring)
  getMonitoring(@CurrentUser() user: JwtPayload) {
    return this.statsService.getMonitoring(user.id);
  }
}
