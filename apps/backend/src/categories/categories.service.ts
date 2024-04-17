import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryInput: CreateCategoryInput) {
    const category = await this.prismaService.category.create({
      data: createCategoryInput,
    });

    return category;
  }

  async findAll() {
    const categories = await this.prismaService.category.findMany();

    return categories;
  }

  async findOne(id: number) {
    const category = await this.prismaService.category.findUnique({
      where: {
        id,
      },
    });

    return category;
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    const category = await this.prismaService.category.update({
      where: {
        id,
      },
      data: updateCategoryInput,
    });

    return category;
  }

  async remove(id: number) {
    const category = await this.prismaService.category.delete({
      where: {
        id,
      },
    });

    return category;
  }
}
