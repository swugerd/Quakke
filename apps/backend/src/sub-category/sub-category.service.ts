import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@Injectable()
export class SubCategoryService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(dto: CreateSubCategoryDto) {
    const subCategory = await this.prismaService.subCategory.create({
      data: dto,
    });

    return subCategory;
  }

  async findAll() {
    const subCategories = await this.prismaService.subCategory.findMany();

    return subCategories;
  }

  async findOne(id: number) {
    const subCategory = await this.prismaService.subCategory.findUnique({
      where: {
        id,
      },
    });
    return subCategory;
  }

  async update(id: number, dto: UpdateSubCategoryDto) {
    const subCategory = await this.prismaService.subCategory.update({
      where: {
        id,
      },
      data: dto,
    });

    return subCategory;
  }

  async remove(id: number) {
    const subCategory = await this.prismaService.subCategory.delete({
      where: {
        id,
      },
    });

    return subCategory;
  }
}
