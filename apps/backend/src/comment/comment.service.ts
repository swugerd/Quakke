import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/auth/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';

const includeObject = {
  user: true,
  parent: true,
  replies: {
    include: {
      user: true,
    },
  },
  video: true,
};

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCommentInput: CreateCommentInput, user: JwtPayload) {
    const comment = await this.prismaService.comment.create({
      data: {
        ...createCommentInput,
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

  async update(id: number, updateCommentInput: UpdateCommentInput) {
    const comment = await this.prismaService.comment.update({
      where: {
        id,
      },
      data: updateCommentInput,
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
