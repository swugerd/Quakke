import { Module } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { VideoResolver } from './video.resolver';
import { VideoService } from './video.service';

@Module({
  providers: [VideoResolver, VideoService, FileService],
})
export class VideoModule {}
