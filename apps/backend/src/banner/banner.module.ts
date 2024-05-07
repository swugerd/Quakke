import { Module } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { BannerResolver } from './banner.resolver';
import { BannerService } from './banner.service';

@Module({
  providers: [BannerResolver, BannerService, FileService],
})
export class BannerModule {}
