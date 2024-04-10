import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Provider, User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { Cache } from 'cache-manager';
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
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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

  async register(dto: SignUpInput) {
    const user = await this.prismaService.user
      .findFirst({
        where: {
          OR: [{ email: dto.email }, { login: dto.login }],
        },
      })
      .catch((err) => {
        this.logger.error(err);
        return null;
      });

    if (user) {
      throw new ConflictException(
        'Пользователь с таким email уже зарегистрирован',
      );
    }
    return this.userService.save(dto).catch((err) => {
      this.logger.error(err);
      return null;
    });
  }

  async login(dto: SignInInput, agent: string) {
    const user: User = await this.prismaService.user
      .findFirst({
        where: {
          OR: [{ email: dto.credentials }, { login: dto.credentials }],
        },
      })
      .catch((err) => {
        this.logger.error(err);
        return null;
      });
    await this.cacheManager.del(String(user.id));
    if (!user || !compareSync(dto.password, user.password)) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    return this.generateTokens(user, agent);
  }

  private async generateTokens(user: User, agent: string) {
    const accessToken =
      'Bearer ' +
      this.jwtService.sign({
        id: user.id,
        email: user.email,
        role: user.roleId,
      });
    const refreshToken = await this.getRefreshToken(String(user.id), agent);
    return { accessToken, refreshToken };
  }

  private async getRefreshToken(userId: string, agent: string) {
    const _token = await this.prismaService.refreshToken.findFirst({
      where: {
        userId: Number(userId),
        userAgent: agent,
      },
    });
    const token = _token?.token ?? '';

    return this.prismaService.refreshToken.upsert({
      where: { token },
      update: {
        token: v4(),
        expiresAt: add(new Date(), { months: 1 }),
      },
      create: {
        token: v4(),
        expiresAt: add(new Date(), { months: 1 }),
        userId: Number(userId),
        userAgent: agent,
      },
    });
  }

  deleteRefreshToken(token: string) {
    return this.prismaService.refreshToken.delete({ where: { token } });
  }

  async providerAuth(email: string, agent: string, provider: Provider) {
    const userExists = await this.userService.getByEmail(email);
    if (userExists) {
      const user = await this.userService
        .save({ email, provider })
        .catch((err) => {
          this.logger.error(err);
          return null;
        });
      return this.generateTokens(user, agent);
    }
    const user = await this.userService
      .save({ email, provider })
      .catch((err) => {
        this.logger.error(err);
        return null;
      });
    if (!user) {
      throw new HttpException(
        `Не получилось создать пользователя с email ${email} в Google auth`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.generateTokens(user, agent);
  }
}
