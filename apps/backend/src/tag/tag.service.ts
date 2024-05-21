import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.input';
import { UpdateTagDto } from './dto/update-tag.input';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateTagDto) {
    const tag = await this.prismaService.tag.create({
      data: dto,
    });

    return tag;
  }

  async findAll() {
    const tags = await this.prismaService.tag.findMany();

    return tags;
  }

  async findOne(id: number) {
    const tag = await this.prismaService.tag.findUnique({
      where: {
        id,
      },
    });

    return tag;
  }

  async update(id: number, dto: UpdateTagDto) {
    const tag = await this.prismaService.tag.update({
      where: {
        id,
      },
      data: dto,
    });

    return tag;
  }

  async remove(id: number) {
    const tag = await this.prismaService.tag.delete({
      where: {
        id,
      },
    });

    return tag;
  }
}
