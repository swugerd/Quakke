import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTagInput: CreateTagInput) {
    const tag = await this.prismaService.tag.create({
      data: createTagInput,
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

  async update(id: number, updateTagInput: UpdateTagInput) {
    const tag = await this.prismaService.tag.update({
      where: {
        id,
      },
      data: updateTagInput,
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
