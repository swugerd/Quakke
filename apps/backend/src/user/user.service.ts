import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { genSaltSync, hash } from 'bcrypt';
import { join } from 'path';
import { PrismaService } from '../../src/prisma/prisma.service';
import { folders } from '../constants';
import config from '../constants/config';
import { FileService } from '../file/file.service';
import { FileDto } from '../utils/dto/file.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { QuerySearchDto } from './dto/query-search.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const includeObject = {
  selectedCategories: {
    select: {
      category: true,
    },
  },
  banners: true,
  comments: true,
  complaints: true,
  dislikes: true,
  history: true,
  likes: true,
  notifications: true,
  partnerRequests: true,
  playlists: true,
  role: true,
  settings: true,
  subscribers: true,
  userAvatar: true,
  videos: true,
};
@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: CreateUserDto) {
    const hashedPassword = await this.hashPassword(dto.password);

    const user = await this.prismaService.user.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
      include: includeObject,
    });

    return user;
  }

  async update(dto: UpdateUserDto) {
    const user = await this.prismaService.user.update({
      where: { id: dto.id },
      data: {
        ...dto,
      },
      include: includeObject,
    });

    return user;
  }

  async getAll() {
    const users = await this.prismaService.user.findMany({
      include: includeObject,
    });

    return users;
  }

  async uploadFile(file: FileDto) {
    const uploadedFile = await file.file;
    const { fileName, fileSize } = await this.fileService.createFile(
      file,
      'IMAGES',
    );

    const savedFile = await this.prismaService.userAvatar.create({
      data: {
        extension: uploadedFile.mimetype,
        size: fileSize,
        url: fileName,
      },
    });

    return savedFile;
  }

  async deleteFile(id: number) {
    const file = await this.prismaService.userAvatar.findUnique({
      where: {
        id,
      },
    });

    await this.fileService.deleteFile(
      join(this.configService.get(config.STATIC_PATH), folders['IMAGES']),
      file.url,
    );

    const deletedFile = await this.prismaService.userAvatar.delete({
      where: {
        id: file.id,
      },
    });

    return deletedFile;
  }

  async getAllWithQuery(query: QuerySearchDto) {
    const findManyOptions: Prisma.UserFindManyArgs = {
      where: {},
      skip: query.offset,
      take: query.limit,
      include: includeObject,
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
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: includeObject,
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
      include: includeObject,
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
      include: includeObject,
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
