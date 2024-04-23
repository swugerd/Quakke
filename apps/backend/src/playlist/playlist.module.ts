import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistResolver } from './playlist.resolver';

@Module({
  providers: [PlaylistResolver, PlaylistService],
})
export class PlaylistModule {}
