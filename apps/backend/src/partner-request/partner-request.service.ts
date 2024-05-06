import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePartnerRequestInput } from './dto/create-partner-request.input';
import { UpdatePartnerRequestInput } from './dto/update-partner-request.input';

const includeObject = {
  user: true,
};

@Injectable()
export class PartnerRequestService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createPartnerRequestInput: CreatePartnerRequestInput,
    userId: number,
  ) {
    const request = await this.prismaService.partnerRequest.create({
      data: {
        ...createPartnerRequestInput,
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

  async update(
    id: number,
    updatePartnerRequestInput: UpdatePartnerRequestInput,
  ) {
    const request = await this.prismaService.partnerRequest.update({
      where: {
        id,
      },
      data: updatePartnerRequestInput,
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
