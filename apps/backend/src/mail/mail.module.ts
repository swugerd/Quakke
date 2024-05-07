import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import config from 'src/constants/config';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const auth =
          configService.get(config.NODE_ENV) === 'production'
            ? {
                auth: {
                  user: configService.get(config.SMTP_USERNAME),
                  pass: configService.get(config.SMTP_USER_PASSWORD),
                },
              }
            : {};

        return {
          transport: {
            host: configService.get(config.SMTP_HOST),
            port: configService.get(config.SMTP_PORT),
            secure:
              configService.get(config.SMTP_SECURE) === 'false' ? false : true,
            ...auth,
          },
          defaults: {
            from: `"No Reply" <${configService.get(config.SMTP_FROM)}>`,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
