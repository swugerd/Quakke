import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserInput: CreateUserInput) {
    const user = this.prisma.user.create({
      data: createUserInput,
    });

    return user;
  }

  getAll() {
    const users = this.prisma.user.findMany();

    return users;
  }

  getOne(id: number) {
    const user = this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    const updatedUser = this.prisma.user.update({
      where: { id },
      data: updateUserInput,
    });

    return updatedUser;
  }

  remove(id: number) {
    const deletedUser = this.prisma.user.delete({
      where: { id },
    });

    return deletedUser;
  }
}
