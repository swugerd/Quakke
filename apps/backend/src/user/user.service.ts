import { Injectable } from '@nestjs/common';
import { genSaltSync, hash } from 'bcrypt';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateUserInput) {
    const hashedPassword = await this.hashPassword(dto.password);

    const user = await this.prismaService.user.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
    });

    return user;
  }

  async update(dto: UpdateUserInput) {
    const user = await this.prismaService.user.update({
      where: { id: dto.id },
      data: {
        ...dto,
      },
    });

    return user;
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
