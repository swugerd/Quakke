import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import config from '../constants/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async sendUserConfirmation(email: string) {
    const emailVerif = await this.prismaService.emailVerification.findUnique({
      where: {
        email,
      },
    });

    try {
      const url = `${this.configService.get(config.CLIENT_HOST)}/auth/confirm?token=${emailVerif.token}`;

      const msg = await this.mailerService.sendMail({
        to: email,
        subject: 'Quakke account confirmation',
        template: './confirmation',
        context: {
          name: email,
          url,
        },
      });

      return msg;
    } catch (error) {
      return error;
    }
  }

  async sendForgotPassword(email: string) {
    const passwordVerif = await this.prismaService.forgottenPassword.findUnique(
      {
        where: {
          email,
        },
      },
    );

    try {
      const msg = await this.mailerService.sendMail({
        to: email,
        subject: 'Quakke account password reset',
        template: './forgot-password',
        context: {
          name: email,
          token: passwordVerif.token,
        },
      });

      return msg;
    } catch (error) {
      return error;
    }
  }
}
