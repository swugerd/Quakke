import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import config from 'src/constants/config';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(config.JWT_ACCESS_SECRET),
    });
  }

  async validate(payload: JwtPayload) {
    const user: User = await this.userService
      .getById(payload.id)
      .catch((err) => {
        this.logger.error(err);
        return null;
      });
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
