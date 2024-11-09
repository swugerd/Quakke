import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Roles, User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { add } from 'date-fns';
import { mailMinutesToExpire, maxCharLengthList } from 'src/constants';
import config from 'src/constants/config';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { v4 } from 'uuid';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async refreshTokens(refreshToken: string, agent: string) {
    const token = await this.prismaService.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!token || new Date(token.expiresAt) < new Date()) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.getById(token.userId);

    return this.generateTokens(user, agent);
  }

  async register(dto: SignUpDto, agent: string) {
    const userExists = await this.prismaService.user
      .findFirst({
        where: {
          OR: [{ email: dto.email }, { login: dto.login }],
        },
      })
      .catch((err) => {
        this.logger.error(err);
        return null;
      });

    if (userExists) {
      throw new ConflictException('User with this email already registered');
    }

    const user = await this.userService.create(dto).catch((err) => {
      this.logger.error(err);
      return null;
    });

    return this.generateTokens(user, agent);
  }

  async login(dto: SignInDto, agent: string) {
    const user = await this.prismaService.user
      .findFirst({
        where: {
          OR: [{ email: dto.credentials }, { login: dto.credentials }],
        },
      })
      .catch((err) => {
        this.logger.error(err);
        return null;
      });

    if (!user || !compareSync(dto.password, user.password)) {
      throw new UnauthorizedException('Wrong credentials');
    }

    return this.generateTokens(user, agent);
  }

  private async generateTokens(user: User, agent: string) {
    const roleExists = user?.roleId
      ? await this.prismaService.role.findUnique({
          where: {
            id: user.roleId,
          },
        })
      : null;

    const accessToken = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: roleExists ? roleExists.name : Roles.USER,
    });

    const refreshToken = await this.getRefreshToken(user, agent);

    return { accessToken, refreshToken };
  }

  private async getRefreshToken(user: User, agent: string) {
    const _token = await this.prismaService.refreshToken.findFirst({
      where: {
        userId: user.id,
        userAgent: agent,
      },
    });

    const token = _token?.token ?? '';

    const refreshToken = await this.prismaService.refreshToken.upsert({
      where: { token },
      update: {
        token: v4(),
        expiresAt: add(new Date(), {
          days: Number(this.configService.get(config.JWT_REFRESH_EXP)[0]),
        }),
      },
      create: {
        token: v4(),
        expiresAt: add(new Date(), {
          days: Number(this.configService.get(config.JWT_REFRESH_EXP)[0]),
        }),
        userId: user.id,
        userAgent: agent,
      },
    });

    return refreshToken;
  }

  async createEmailToken(email: string) {
    const emailVerification =
      await this.prismaService.emailVerification.findUnique({
        where: {
          email,
        },
      });

    if (
      emailVerification &&
      (new Date().getTime() - emailVerification.timestamp.getTime()) / 60000 <
        mailMinutesToExpire
    ) {
      throw new BadRequestException(
        `Email already sent recently (${mailMinutesToExpire} min)`,
      );
    }

    await this.prismaService.emailVerification.upsert({
      where: {
        email,
      },
      create: {
        email: email,
        token: v4(),
        timestamp: new Date(),
      },
      update: {
        email: email,
        token: v4(),
        timestamp: new Date(),
      },
    });

    const isEmailSent = await this.mailService.sendUserConfirmation(email);

    if (isEmailSent) {
      return { message: 'Email sent' };
    }

    return new BadRequestException('An error occurried while sending email');
  }

  async createForgottenPasswordToken(email: string) {
    const forgottenPassword =
      await this.prismaService.forgottenPassword.findUnique({
        where: {
          email,
        },
      });

    if (
      forgottenPassword &&
      (new Date().getTime() - forgottenPassword.timestamp.getTime()) / 60000 <
        mailMinutesToExpire
    ) {
      throw new BadRequestException(
        `Email already sent recently (${mailMinutesToExpire} min)`,
      );
    }

    const tokenNumLength = Number(
      1 + '0'.repeat(maxCharLengthList.passwordResetToken - 1),
    );

    await this.prismaService.forgottenPassword.upsert({
      where: {
        email,
      },
      create: {
        email: email,
        token: (
          Math.floor(Math.random() * (9 * tokenNumLength)) +
          1 * tokenNumLength
        ).toString(),
        timestamp: new Date(),
      },
      update: {
        email: email,
        token: (
          Math.floor(Math.random() * (9 * tokenNumLength)) +
          1 * tokenNumLength
        ).toString(),
        timestamp: new Date(),
      },
    });

    const isEmailSent = await this.mailService.sendForgotPassword(email);

    if (isEmailSent) {
      return { message: 'Email sent' };
    }

    return new BadRequestException('An error occurried while sending email');
  }

  async verifyEmail(token: string) {
    const emailVerif = await this.prismaService.emailVerification.findUnique({
      where: {
        token,
      },
    });

    if (emailVerif && emailVerif.email) {
      const userFromDb = await this.prismaService.user.findUnique({
        where: {
          email: emailVerif.email,
        },
      });

      if (userFromDb) {
        await this.prismaService.emailVerification.delete({
          where: {
            id: emailVerif.id,
          },
        });

        return { message: 'Email verified' };
      }
    }

    throw new ForbiddenException('Incorrect token');
  }

  async verifyPasswordChange(dto: ResetPasswordDto) {
    const dbForgottenPassword =
      await this.prismaService.forgottenPassword.findUnique({
        where: {
          token: dto.token,
        },
      });

    if (!dbForgottenPassword) {
      return { message: 'Incorrect token' };
    }

    if (dbForgottenPassword.email !== dto.email) {
      return {
        message: `Incorrect email for token - ${dbForgottenPassword.token}`,
      };
    }

    await this.userService.setPassword(
      dbForgottenPassword.email,
      dto.newPassword,
    );

    await this.prismaService.forgottenPassword.delete({
      where: {
        id: dbForgottenPassword.id,
      },
    });

    return { message: 'Password chnaged' };
  }

  deleteRefreshToken(token: string) {
    return this.prismaService.refreshToken.delete({ where: { token } });
  }
}
