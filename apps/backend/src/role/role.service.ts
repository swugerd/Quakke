import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRoleInput: CreateRoleInput) {
    const role = await this.prismaService.role.create({
      data: createRoleInput,
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

  async update(id: number, updateRoleInput: UpdateRoleInput) {
    const role = await this.prismaService.role.update({
      where: {
        id,
      },
      data: updateRoleInput,
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
