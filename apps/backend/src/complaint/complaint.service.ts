import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { ComplaintQuerySearchDto } from './dto/query-search.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';

const includeObject = {
  user: true,
  video: true,
};

@Injectable()
export class ComplaintService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateComplaintDto) {
    const complaint = await this.prismaService.complaint.create({
      data: dto,
      include: includeObject,
    });

    return complaint;
  }

  async findAll() {
    const complaints = await this.prismaService.complaint.findMany({
      include: includeObject,
    });

    return complaints;
  }

  async getAllWithQuery(query: ComplaintQuerySearchDto) {
    const findManyOptions: Prisma.ComplaintFindManyArgs = {
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
      reason: query.reason,
      message: query.message,
    });

    if (searchParams.length) {
      findManyOptions.where.OR = [...searchParams];
    }

    const [data, count] = await this.prismaService.$transaction([
      this.prismaService.complaint.findMany({
        ...findManyOptions,
      }),
      this.prismaService.complaint.count({ where: findManyOptions.where }),
    ]);

    return {
      data,
      count,
    };
  }

  async findOne(id: number) {
    const complaint = await this.prismaService.complaint.findUnique({
      where: {
        id,
      },
      include: includeObject,
    });

    return complaint;
  }

  async update(id: number, dto: UpdateComplaintDto) {
    const complaint = await this.prismaService.complaint.update({
      where: {
        id,
      },
      data: dto,
      include: includeObject,
    });

    return complaint;
  }

  async remove(id: number) {
    const complaint = await this.prismaService.complaint.delete({
      where: {
        id,
      },
    });

    return complaint;
  }
}
