import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesQuerySearchDto } from './dto/query-search.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';

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

  async getAllWithQuery(query: CategoriesQuerySearchDto) {
    const findManyOptions: Prisma.CategoryFindManyArgs = {
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
      name: query.name,
    });

    if (searchParams.length) {
      findManyOptions.where.OR = [...searchParams];
    }

    const [data, count] = await this.prismaService.$transaction([
      this.prismaService.category.findMany({
        ...findManyOptions,
      }),
      this.prismaService.category.count({ where: findManyOptions.where }),
    ]);

    return {
      data,
      count,
    };
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
