import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt';
import { Cache } from 'cache-manager';
import { JwtPayload } from 'src/auth/interfaces';
import { convertToSecondsUtil } from 'src/auth/utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  async save(user: Partial<User>) {
    const hashedPassword = user?.password
      ? this.hashPassword(user.password)
      : null;
    const savedUser = await this.prismaService.user.upsert({
      where: {
        email: user.email,
      },
      update: {
        password: hashedPassword ?? undefined,
        provider: user?.provider ?? undefined,
        isBlocked: user?.isBlocked ?? undefined,
      },
      create: {
        email: user.email,
        password: hashedPassword,
        provider: user.provider,
        login: user.login,
        name: user.name,
      },
    });
    await this.cacheManager.set(String(savedUser.id), savedUser);
    await this.cacheManager.set(savedUser.email, savedUser);
    return savedUser;
  }

  async getAll() {
    const users = await this.prismaService.user.findMany();

    return users;
  }

  async getById(id: number) {
    const user = await this.cacheManager.get<User>(String(id));

    if (!user) {
      const user = await this.prismaService.user.findFirst({
        where: {
          id,
        },
      });
      if (!user) {
        return null;
      }
      await this.cacheManager.set(
        String(id),
        user,
        convertToSecondsUtil(this.configService.get('JWT_ACCESS_EXP')),
      );
      return user;
    }
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async remove(id: number, user: JwtPayload) {
    if (user.id !== id) {
      throw new ForbiddenException();
    }
    await Promise.all([
      this.cacheManager.del(String(id)),
      this.cacheManager.del(user.email),
    ]);
    return this.prismaService.user.delete({
      where: { id },
      select: { id: true },
    });
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
