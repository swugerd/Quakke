import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import config from 'src/constants/config';
import { AuthService } from './auth.service';
import { Cookie, Public, UserAgent } from './decorators';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { Tokens } from './interfaces';
import { AuthResponse } from './responses/auth-response';
import { EmailResponse } from './responses/email-response';
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
    @Args('dto') dto: SignUpDto,
    @Context('res') res: Response,
    @UserAgent('userAgent') agent: string,
  ) {
    const tokens = await this.authService.register(dto, agent);

    if (!tokens) {
      throw new Error(
        `Failed to register user with data ${JSON.stringify(dto)}`,
      );
    }

    this.setRefreshTokenToCookies(tokens, res);

    return { accessToken: tokens.accessToken };
  }

  @Public()
  @Mutation(() => AuthResponse)
  async login(
    @Args('dto') dto: SignInDto,
    @Context('res') res: Response,
    @UserAgent('userAgent') agent: string,
  ) {
    const tokens = await this.authService.login(dto, agent);

    if (!tokens) {
      throw new BadRequestException(
        `Can't login with data: ${JSON.stringify(dto)}`,
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
      throw new BadRequestException('User is not authenticated');
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

  @Public()
  @Query(() => EmailResponse)
  public async sendEmailVerification(@Args('email') email: string) {
    return await this.authService.createEmailToken(email);
  }

  @Public()
  @Query(() => EmailResponse)
  public async verifyEmail(@Args('token') token: string) {
    return await this.authService.verifyEmail(token);
  }

  @Public()
  @Query(() => EmailResponse)
  public async sendEmailForgotPassword(@Args('email') email: string) {
    return await this.authService.createForgottenPasswordToken(email);
  }

  @Public()
  @Mutation(() => EmailResponse)
  public async setNewPassord(@Args('dto') dto: ResetPasswordDto) {
    return await this.authService.verifyPasswordChange(dto);
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
