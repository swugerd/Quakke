import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-yandex';

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
  constructor(private readonly configService: ConfigService) {
    const clientID = configService.get('YANDEX_APP_ID');
    const clientSecret = configService.get('YANDEX_APP_SECRET');
    const serverHost = configService.get('SERVER_HOST');
    const serverPort = configService.get('SERVER_PORT');
    const serverGlobalPrefix = configService.get('SERVER_HOST');
    super({
      clientID,
      clientSecret,
      callbackURL: `${serverHost}:${serverPort}/${serverGlobalPrefix}/auth/yandex/callback`,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { id, displayName, emails, photos } = profile;
    const user = {
      id,
      displayName,
      email: emails[0].value,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
