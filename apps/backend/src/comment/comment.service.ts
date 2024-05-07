import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/auth/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
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
