import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    const category = await this.prismaService.category.create({
      data: dto,
    });

    return category;
  }

  async findAll() {
    const categories = await this.prismaService.category.findMany({
      include: {
        subCategories: true,
      },
    });

    return categories;
  }

  async findOne(id: number) {
    const category = await this.prismaService.category.findUnique({
      where: {
        id,
      },
      include: {
        subCategories: true,
      },
    });

    return category;
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.prismaService.category.update({
      where: {
        id,
      },
      data: dto,
      include: {
        subCategories: true,
      },
    });

    return category;
  }

  async remove(id: number) {
    const category = await this.prismaService.category.delete({
      where: {
        id,
      },
      include: {
        subCategories: true,
      },
    });

    return category;
  }
}
