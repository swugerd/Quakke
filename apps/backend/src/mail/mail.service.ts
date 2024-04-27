import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import config from 'src/constants/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `${this.configService.get(config.CLIENT_HOST)}/auth/confirm?token=${token}`;

    const msg = await this.mailerService.sendMail({
      to: user.email,
      subject: 'Wave account confirmation',
      template: './confirmation',
      context: {
        name: user.name,
        url,
      },
    });

    return msg;
  }
}
