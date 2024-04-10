import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserResolver, UserService],
  imports: [CacheModule.register()],
  exports: [UserService],
})
export class UserModule {}
