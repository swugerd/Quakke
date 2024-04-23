import { Prisma, PrismaClient } from '@prisma/client';

import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const userPassword = await bcrypt.hash('password', 10);

  for (let i = 0; i < 100; i++) {
    await prisma.user.create({
      data: { ...createRandomUserData(), password: userPassword },
    });
  }
}

function createRandomUserData(): Prisma.UserCreateInput {
  return {
    name: faker.person.fullName(),
    login: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
  };
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
