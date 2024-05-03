import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { genSaltSync, hash } from 'bcrypt';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { QuerySearchInput } from './dto/query-search.input';
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

  async getAllWithQuery(query: QuerySearchInput) {
    const findManyOptions: Prisma.UserFindManyArgs = {
      where: {},
      skip: query.offset,
      take: query.limit,
    };

    if (query.isBanned) {
      findManyOptions.where.isBanned = true;
    }

    if (query.isPartner) {
      findManyOptions.where.isPartner = true;
    }

    if (query.orderBy && query.orderDirection) {
      findManyOptions.orderBy = [
        Object.fromEntries([[query.orderBy, query.orderDirection]]),
      ];
    }

    const searchParams = PrismaService.getPrismaSearchingProperties({
      name: query.name,
      login: query.login,
      email: query.email,
    });

    if (searchParams.length) {
      findManyOptions.where.OR = [...searchParams];
    }

    const [data, count] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
        ...findManyOptions,
      }),
      this.prismaService.user.count({ where: findManyOptions.where }),
    ]);

    return {
      data,
      count,
    };
  }

  async getById(id: number) {
    const user = this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
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

  async setPassword(email: string, newPassword: string) {
    const userFromDb = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!userFromDb)
      throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    this.update({
      id: userFromDb.id,
      password: await bcrypt.hash(newPassword, 10),
    });

    return true;
  }

  private async hashPassword(password: string) {
    return hash(password, genSaltSync(10));
  }
}
