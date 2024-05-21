import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { FileService } from 'src/file/file.service';
import { MailService } from 'src/mail/mail.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { options } from './config';
import { GUARDS } from './guards';
import { STRATEGIES } from './strategies';

@Module({
  providers: [
    AuthResolver,
    AuthService,
    MailService,
    UserService,
    FileService,
    ...STRATEGIES,
    ...GUARDS,
  ],
  imports: [PassportModule, JwtModule.registerAsync(options()), UserModule],
})
export class AuthModule {}
