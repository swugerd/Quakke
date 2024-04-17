import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Roles, User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { add } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { v4 } from 'uuid';
import { SignInInput } from './dto/signin-input';
import { SignUpInput } from './dto/signup-input';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async refreshTokens(refreshToken: string, agent: string) {
    const token = await this.prismaService.refreshToken.delete({
      where: { token: refreshToken },
    });

    if (!token || new Date(token.expiresAt) < new Date()) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.getById(token.userId);

    return this.generateTokens(user, agent);
  }

  async register(dto: SignUpInput, agent: string) {
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
      throw new ConflictException(
        'Пользователь с таким email уже зарегистрирован',
      );
    }

    const user = await this.userService.create(dto).catch((err) => {
      this.logger.error(err);
      return null;
    });

    return this.generateTokens(user, agent);
  }

  async login(dto: SignInInput, agent: string) {
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
          days: Number(this.configService.get('JWT_REFRESH_EXP')[0]),
        }),
      },
      create: {
        token: v4(),
        expiresAt: add(new Date(), {
          days: Number(this.configService.get('JWT_REFRESH_EXP')[0]),
        }),
        userId: user.id,
        userAgent: agent,
      },
    });

    return refreshToken;
  }

  deleteRefreshToken(token: string) {
    return this.prismaService.refreshToken.delete({ where: { token } });
  }
}
