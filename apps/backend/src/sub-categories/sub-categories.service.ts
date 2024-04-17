import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubCategoryInput } from './dto/create-sub-category.input';
import { UpdateSubCategoryInput } from './dto/update-sub-category.input';

@Injectable()
export class SubCategoriesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createSubCategoryInput: CreateSubCategoryInput) {
    const subCategory = await this.prismaService.subCategory.create({
      data: createSubCategoryInput,
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

  async update(id: number, updateSubCategoryInput: UpdateSubCategoryInput) {
    const subCategory = await this.prismaService.subCategory.update({
      where: {
        id,
      },
      data: updateSubCategoryInput,
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
