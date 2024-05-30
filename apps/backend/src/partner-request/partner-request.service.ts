import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreatePartnerRequestDto } from './dto/create-partner-request.dto';
import { PartnerRequestQuerySearchDto } from './dto/query-search.dto';
import { UpdatePartnerRequestDto } from './dto/update-partner-request.dto';
import { PrismaService } from '../prisma/prisma.service';

const includeObject = {
  user: true,
};

@Injectable()
export class PartnerRequestService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreatePartnerRequestDto, userId: number) {
    const request = await this.prismaService.partnerRequest.create({
      data: {
        ...dto,
        userId,
      },
      include: includeObject,
    });

    return request;
  }

  async findAll() {
    const requests = await this.prismaService.partnerRequest.findMany({
      include: includeObject,
    });

    return requests;
  }

  async getAllWithQuery(query: PartnerRequestQuerySearchDto) {
    const findManyOptions: Prisma.PartnerRequestFindManyArgs = {
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
      message: query.message,
      status: query.status,
    });

    if (searchParams.length) {
      findManyOptions.where.OR = [...searchParams];
    }

    const [data, count] = await this.prismaService.$transaction([
      this.prismaService.partnerRequest.findMany({
        ...findManyOptions,
      }),
      this.prismaService.partnerRequest.count({ where: findManyOptions.where }),
    ]);

    return {
      data,
      count,
    };
  }

  async findOne(id: number) {
    const request = await this.prismaService.partnerRequest.findUnique({
      where: {
        id,
      },
      include: includeObject,
    });

    return request;
  }

  async update(id: number, dto: UpdatePartnerRequestDto) {
    const request = await this.prismaService.partnerRequest.update({
      where: {
        id,
      },
      data: dto,
      include: includeObject,
    });

    return request;
  }

  async remove(id: number) {
    const request = await this.prismaService.partnerRequest.delete({
      where: {
        id,
      },
      include: includeObject,
    });

    return request;
  }
}
