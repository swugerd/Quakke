import { Module } from '@nestjs/common';
import { ViewsService } from './views.service';
import { ViewsResolver } from './views.resolver';

@Module({
  providers: [ViewsResolver, ViewsService],
})
export class ViewsModule {}
