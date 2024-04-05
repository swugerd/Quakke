import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInInput } from './dto/signin-input';
import { SignUpInput } from './dto/signup-input';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jswtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signup(signUpInput: SignUpInput) {
    const hashedPassword = await argon.hash(signUpInput.password);

    const user = await this.prisma.user.create({
      data: { ...signUpInput, password: hashedPassword },
    });

    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.email,
    );

    await this.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken, user };
  }

  async signin(signInInput: SignInInput) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            login: signInInput.credentials,
          },
          {
            email: signInInput.credentials,
          },
        ],
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const doPasswordMatch = await argon.verify(
      user.password,
      signInInput.password,
    );

    if (!doPasswordMatch) {
      throw new ForbiddenException('Wrong password');
    }

    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.email,
    );

    await this.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken, user };
  }

  async logout(userId: number) {
    await this.prisma.refreshToken.delete({
      where: {
        userId,
      },
    });

    return { loggedOut: true };
  }

  async createTokens(userId: number, email: string) {
    const accessToken = this.jswtService.sign(
      {
        userId,
        email,
      },
      {
        expiresIn: '1h',
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      },
    );

    const refreshToken = this.jswtService.sign(
      {
        userId,
        email,
        accessToken,
      },
      {
        expiresIn: '7d',
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      },
    );

    await this.prisma.refreshToken.create({
      data: { userId, token: refreshToken },
    });

    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshedToken = await argon.hash(refreshToken);

    await this.prisma.refreshToken.update({
      where: {
        userId,
      },
      data: {
        token: hashedRefreshedToken,
      },
    });
  }

  async getNewTokens(userId: number, rt: string) {
    const { token, userId: userTokenId } =
      await this.prisma.refreshToken.findFirst({
        where: { id: userId },
      });

    const user = await this.prisma.user.findFirst({
      where: { id: userTokenId },
    });

    if (!token) {
      throw new ForbiddenException('Access Denied');
    }

    const isRefreshTokenMatch = await argon.verify(token, rt);

    if (!isRefreshTokenMatch) {
      throw new ForbiddenException('Access Denied');
    }

    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.email,
    );

    await this.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken, user };
  }
}
