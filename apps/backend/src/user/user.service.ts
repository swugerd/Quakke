import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { genSaltSync, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async save(user: Partial<User>) {
    const hashedPassword = user?.password
      ? await this.hashPassword(user.password)
      : null;
    const savedUser = await this.prismaService.user.upsert({
      where: {
        email: user.email,
      },
      update: {
        password: hashedPassword ?? undefined,
      },
      create: {
        email: user.email,
        password: hashedPassword,
        login: user.login,
        name: user.name,
      },
    });
    return savedUser;
  }

  async getAll() {
    const users = await this.prismaService.user.findMany();

    return users;
  }

  async getById(id: number) {
    const user = this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      const user = await this.prismaService.user.findFirst({
        where: {
          id,
        },
      });
      if (!user) {
        return null;
      }
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

  async remove(id: number) {
    const tokensExists = await this.prismaService.refreshToken.findFirst({
      where: {
        userId: id,
      },
    });

    if (tokensExists) {
      await this.prismaService.refreshToken.deleteMany({
        where: { userId: id },
      });
    }

    return this.prismaService.user.delete({
      where: { id },
    });
  }

  private async hashPassword(password: string) {
    return hash(password, genSaltSync(10));
  }
}
