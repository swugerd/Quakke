import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
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
