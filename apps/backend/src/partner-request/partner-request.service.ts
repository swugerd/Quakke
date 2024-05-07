import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePartnerRequestDto } from './dto/create-partner-request.dto';
import { UpdatePartnerRequestDto } from './dto/update-partner-request.dto';

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
