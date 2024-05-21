import { Module } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserResolver, UserService, FileService],
  exports: [UserService],
})
export class UserModule {}
