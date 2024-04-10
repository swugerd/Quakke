import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  HttpStatus,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Provider } from '@prisma/client';
import { Request, Response } from 'express';
import { map, mergeMap } from 'rxjs';
import { AuthService } from './auth.service';
import { Cookie, Public, UserAgent } from './decorators';
import { SignInInput } from './dto/signin-input';
import { SignUpInput } from './dto/signup-input';
import { GoogleGuard } from './guards/google.guard';
import { YandexGuard } from './guards/yandex.guard';
import { handleTimeoutAndErrors } from './helpers';
import { Tokens } from './interfaces';

const REFRESH_TOKEN = 'refreshToken';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  @Public()
  @Mutation(() => String)
  async register(@Args('input') input: SignUpInput) {
    const user = await this.authService.register(input);
    if (!user) {
      throw new Error(
        `Failed to register user with data ${JSON.stringify(input)}`,
      );
    }
    return user;
  }

  @Public()
  @Mutation(() => String)
  async login(
    @Args('input') input: SignInInput,
    @Context('res') res: Response,
    @UserAgent('userAgent') agent: string,
  ) {
    const tokens = await this.authService.login(input, agent);

    if (!tokens) {
      throw new BadRequestException(
        `Не получается войти с данными ${JSON.stringify(input)}`,
      );
    }

    this.setRefreshTokenToCookies(tokens, res);
  }

  @Mutation(() => Boolean)
  async logout(
    @Cookie('refreshToken') refreshToken: string,
    @Context('res') res: Response,
  ): Promise<boolean> {
    if (!refreshToken) {
      res.sendStatus(HttpStatus.OK);
      return;
    }
    await this.authService.deleteRefreshToken(refreshToken);
    res.cookie(REFRESH_TOKEN, '', {
      httpOnly: true,
      secure: true,
      expires: new Date(),
    });
    res.sendStatus(HttpStatus.OK);
  }

  @Public()
  @Mutation(() => String)
  async refreshTokens(
    @Cookie('refreshToken') refreshToken: string,
    @Context('res') res: Response,
    @UserAgent('userAgent') agent: string,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const tokens = await this.authService.refreshTokens(refreshToken, agent);

    if (!tokens) {
      throw new UnauthorizedException();
    }

    this.setRefreshTokenToCookies(tokens, res);
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
        this.configService.get('NODE_ENV', 'development') === 'production',
      path: '/',
    });
    res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
  }

  @UseGuards(GoogleGuard)
  @Query(() => String)
  async googleAuth() {
    return '';
  }

  @UseGuards(GoogleGuard)
  @Query(() => String)
  async googleAuthCallback(@Context('req') req: Request) {
    const token = req.user['accessToken'];
    return `http://localhost:3000/api/auth/success-google?token=${token}`;
  }

  @Query(() => String)
  async successGoogle(
    @Args('token') token: string,
    @UserAgent('userAgent') agent: string,
    @Context('res') res: Response,
  ) {
    return this.httpService
      .get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`,
      )
      .pipe(
        mergeMap(({ data: { email } }) =>
          this.authService.providerAuth(email, agent, Provider.GOOGLE),
        ),
        map((data) => this.setRefreshTokenToCookies(data, res)),
        handleTimeoutAndErrors(),
      );
  }

  @UseGuards(YandexGuard)
  @Query(() => String)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  yandexAuth() {
    return '';
  }

  @UseGuards(YandexGuard)
  @Query(() => String)
  yandexAuthCallback(
    @Context('req') req: Request,
    @Context('res') res: Response,
  ) {
    const token = req.user['accessToken'];
    return res.redirect(
      `http://localhost:3000/api/auth/success-yandex?token=${token}`,
    );
  }

  @Query(() => String)
  successYandex(
    @Args('token') token: string,
    @UserAgent() agent: string,
    @Context('res') res: Response,
  ) {
    return this.httpService
      .get(`https://login.yandex.ru/info?format=json&oauth_token=${token}`)
      .pipe(
        mergeMap(({ data: { default_email } }) =>
          this.authService.providerAuth(default_email, agent, Provider.YANDEX),
        ),
        map((data) => this.setRefreshTokenToCookies(data, res)),
        handleTimeoutAndErrors(),
      );
  }
}
