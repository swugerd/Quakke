import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateComplaintInput } from './dto/create-complaint.input';
import { UpdateComplaintInput } from './dto/update-complaint.input';

const includeObject = {
  user: true,
  video: true,
};

@Injectable()
export class ComplaintService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createComplaintInput: CreateComplaintInput) {
    const complaint = await this.prismaService.complaint.create({
      data: createComplaintInput,
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

  async update(id: number, updateComplaintInput: UpdateComplaintInput) {
    const complaint = await this.prismaService.complaint.update({
      where: {
        id,
      },
      data: updateComplaintInput,
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
