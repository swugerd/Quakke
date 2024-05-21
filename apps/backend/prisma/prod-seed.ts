import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

(async function () {
  try {
    await prisma.role.createMany({
      data: [
        {
          name: 'ADMIN',
        },
        {
          name: 'USER',
        },
        {
          name: 'MODERATOR',
        },
      ],
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
      console.warn('Roles ADMIN, USER and MODERATOR already exists');
    } else {
      throw e;
    }
  }

  try {
    await prisma.user.create({
      data: {
        login: 'admin',
        name: 'admin',
        email: 'admin@mail.ru',
        password: await bcrypt.hash('admin', 10),
        roleId: 1,
      },
    });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
      console.warn('Admin already exists');
    } else {
      throw e;
    }
  }
})();
