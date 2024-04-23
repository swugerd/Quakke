import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import config from 'src/constants/config';
import { AuthService } from './auth.service';
import { Cookie, Public, UserAgent } from './decorators';
import { SignInInput } from './dto/signin-input';
import { SignUpInput } from './dto/signup-input';
import { Tokens } from './interfaces';
import { AuthResponse } from './responses/auth-response';
import { LogoutResponse } from './responses/logout-response';

const REFRESH_TOKEN = 'refreshToken';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Mutation(() => AuthResponse)
  async register(
    @Args('input') input: SignUpInput,
    @Context('res') res: Response,
    @UserAgent('userAgent') agent: string,
  ) {
    const tokens = await this.authService.register(input, agent);

    if (!tokens) {
      throw new Error(
        `Failed to register user with data ${JSON.stringify(input)}`,
      );
    }

    this.setRefreshTokenToCookies(tokens, res);

    return { accessToken: tokens.accessToken };
  }

  @Public()
  @Mutation(() => AuthResponse)
  async login(
    @Args('input') input: SignInInput,
    @Context('res') res: Response,
    @UserAgent('userAgent') agent: string,
  ) {
    const tokens = await this.authService.login(input, agent);

    if (!tokens) {
      throw new BadRequestException(
        `Can't login with data: ${JSON.stringify(input)}`,
      );
    }

    this.setRefreshTokenToCookies(tokens, res);

    return { accessToken: tokens.accessToken };
  }

  @Mutation(() => LogoutResponse)
  async logout(
    @Cookie('refreshToken') refreshToken: string,
    @Context('res') res: Response,
  ) {
    if (!refreshToken) {
      throw new BadRequestException('User is not auth');
    }

    await this.authService.deleteRefreshToken(refreshToken);

    this.clearCookie(res);

    return {
      success: true,
    };
  }

  @Public()
  @Mutation(() => AuthResponse)
  async refreshTokens(
    @Cookie('refreshToken') refreshToken: string,
    @Context('res') res: Response,
    @UserAgent('userAgent') agent: string,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    this.clearCookie(res);

    const tokens = await this.authService.refreshTokens(refreshToken, agent);

    if (!tokens) {
      throw new UnauthorizedException();
    }

    this.setRefreshTokenToCookies(tokens, res);

    return { accessToken: tokens.accessToken };
  }

  private setRefreshTokenToCookies(tokens: Tokens, res: Response): void {
    if (!tokens) {
      throw new UnauthorizedException();
    }

    res.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(tokens.refreshToken.expiresAt),
      secure:
        this.configService.get(config.NODE_ENV, 'development') === 'production',
      path: '/',
    });
  }

  private clearCookie(res: Response) {
    res.cookie(REFRESH_TOKEN, '', {
      httpOnly: true,
      secure: true,
      expires: new Date(),
    });
  }
}
