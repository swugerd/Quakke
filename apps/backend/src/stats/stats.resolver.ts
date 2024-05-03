import { Resolver, Subscription } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators';
import { JwtPayload } from 'src/auth/interfaces';
import { Monitoring } from './entities/monitoring.entity';
import { StatsService } from './stats.service';

@Resolver(() => Monitoring)
export class StatsResolver {
  constructor(private readonly statsService: StatsService) {}

  @Subscription(() => Monitoring)
  getMonitoring(@CurrentUser() user: JwtPayload) {
    return this.statsService.getMonitoring(user.id);
  }
}
