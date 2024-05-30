import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtPayload } from '../auth/interfaces';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { HistoryQuerySearchDto } from './dto/query-search.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

const includeObject = {
  user: true,
  video: true,
};

@Injectable()
export class HistoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateHistoryDto, user: JwtPayload) {
    const createdHistory = await this.prismaService.videoHistory.create({
      data: {
        ...dto,
        userId: user.id,
      },
      include: includeObject,
    });

    return createdHistory;
  }

  async findAll(user: JwtPayload) {
    const history = await this.prismaService.videoHistory.findMany({
      where: {
        userId: user.id,
      },
      include: includeObject,
    });

    return history;
  }

  async getAllWithQuery(query: HistoryQuerySearchDto) {
    const findManyOptions: Prisma.VideoHistoryFindManyArgs = {
      where: {},
      skip: query.offset,
      take: query.limit,
    };

    if (query.orderBy && query.orderDirection) {
      findManyOptions.orderBy = [
        Object.fromEntries([[query.orderBy, query.orderDirection]]),
      ];
    }

    const [data, count] = await this.prismaService.$transaction([
      this.prismaService.videoHistory.findMany({
        ...findManyOptions,
      }),
      this.prismaService.videoHistory.count({ where: findManyOptions.where }),
    ]);

    return {
      data,
      count,
    };
  }

  async update(id: number, updateHistoryInput: UpdateHistoryDto) {
    const history = await this.prismaService.videoHistory.update({
      where: {
        id,
      },
      data: updateHistoryInput,
      include: includeObject,
    });

    return history;
  }

  async remove(id: number) {
    const history = await this.prismaService.videoHistory.delete({
      where: {
        id,
      },
      include: includeObject,
    });

    return history;
  }

  async removeAll(user: JwtPayload) {
    const count = await this.prismaService.videoHistory.deleteMany({
      where: {
        userId: user.id,
      },
    });

    return count;
  }
}
