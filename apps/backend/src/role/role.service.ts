import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateRoleDto) {
    const role = await this.prismaService.role.create({
      data: dto,
    });

    return role;
  }

  async findAll() {
    const roles = await this.prismaService.role.findMany();

    return roles;
  }

  async findOne(id: number) {
    const role = await this.prismaService.role.findUnique({
      where: {
        id,
      },
    });

    return role;
  }

  async update(id: number, dto: UpdateRoleDto) {
    const role = await this.prismaService.role.update({
      where: {
        id,
      },
      data: dto,
    });

    return role;
  }

  async remove(id: number) {
    const role = await this.prismaService.role.delete({
      where: {
        id,
      },
    });
    return role;
  }
}
