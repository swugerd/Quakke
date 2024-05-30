import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from '../auth/interfaces';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsQuerySearchDto } from './dto/query-search.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

const includeObject = {
  user: true,
  parent: true,
  replies: {
    include: {
      user: true,
    },
  },
  video: true,
  likes: true,
  dislikes: true,
};

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateCommentDto, user: JwtPayload) {
    const comment = await this.prismaService.comment.create({
      data: {
        ...dto,
        userId: user.id,
      },
      include: includeObject,
    });

    return comment;
  }

  async findAll() {
    const comments = await this.prismaService.comment.findMany({
      include: includeObject,
    });

    return comments;
  }

  async getAllWithQuery(query: CommentsQuerySearchDto) {
    const findManyOptions: Prisma.CommentFindManyArgs = {
      where: {},
      skip: query.offset,
      take: query.limit,
    };

    if (query.orderBy && query.orderDirection) {
      findManyOptions.orderBy = [
        Object.fromEntries([[query.orderBy, query.orderDirection]]),
      ];
    }

    const searchParams = PrismaService.getPrismaSearchingProperties({
      name: query.text,
    });

    if (searchParams.length) {
      findManyOptions.where.OR = [...searchParams];
    }

    const [data, count] = await this.prismaService.$transaction([
      this.prismaService.comment.findMany({
        ...findManyOptions,
      }),
      this.prismaService.comment.count({ where: findManyOptions.where }),
    ]);

    return {
      data,
      count,
    };
  }

  async findOne(id: number) {
    const comment = await this.prismaService.comment.findUnique({
      where: {
        id,
      },
      include: includeObject,
    });

    return comment;
  }

  async update(id: number, dto: UpdateCommentDto) {
    const comment = await this.prismaService.comment.update({
      where: {
        id,
      },
      data: dto,
      include: includeObject,
    });

    return comment;
  }

  async remove(id: number) {
    const comment = await this.prismaService.comment.delete({
      where: {
        id,
      },
      include: includeObject,
    });

    return comment;
  }
}
