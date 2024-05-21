import {
  ComplaintReasons,
  Notifications,
  Prisma,
  PrismaClient,
} from '@prisma/client';

import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

const length = 100;

async function main() {
  const userPassword = await bcrypt.hash('password', 10);

  for (let i = 0; i < length; i++) {
    try {
      await prisma.user.create({
        data: { ...createRandomUserData(), password: userPassword },
      });
    } catch (error) {
      continue;
    }
  }

  for (let i = 0; i < length; i++) {
    try {
      await prisma.category.create({
        data: { ...createRandomCategoryData() },
      });
    } catch (error) {
      continue;
    }
  }

  for (let i = 0; i < length; i++) {
    try {
      await prisma.subCategory.create({
        data: { ...createRandomSubCategoryData() },
      });
    } catch (error) {
      continue;
    }
  }

  for (let i = 0; i < length; i++) {
    try {
      await prisma.categoriesOnUsers.create({
        data: {
          categoryId: Math.floor(Math.random() * length) + 1,
          userId: Math.floor(Math.random() * length) + 1,
        },
      });
    } catch (error) {
      continue;
    }
  }

  for (let i = 0; i < length; i++) {
    try {
      await prisma.videoFile.create({
        data: { ...createRandomVideoFileData() },
      });
    } catch (error) {
      continue;
    }
  }

  for (let i = 0; i < length; i++) {
    try {
      await prisma.video.create({
        data: { ...createRandomVideoData() },
      });
    } catch (error) {
      continue;
    }
  }

  for (let i = 0; i < length; i++) {
    try {
      await prisma.comment.create({
        data: { ...createRandomCommentData() },
      });
    } catch (error) {
      continue;
    }
  }

  for (let i = 0; i < length; i++) {
    try {
      await prisma.like.create({
        data: { ...createRandomLikeData() },
      });
    } catch (error) {
      continue;
    }
  }

  for (let i = 0; i < length; i++) {
    try {
      await prisma.dislike.create({
        data: { ...createRandomDislikeData() },
      });
    } catch (error) {
      continue;
    }
  }

  for (let i = 0; i < length; i++) {
    try {
      await prisma.bannerImage.create({
        data: { ...createRandomBannerImageData() },
      });
    } catch (error) {
      continue;
    }
  }

  for (let i = 0; i < length; i++) {
    try {
      await prisma.banner.create({
        data: { ...createRandomBannerData() },
      });
    } catch (error) {
      continue;
    }
  }

  for (let i = 0; i < length; i++) {
    try {
      await prisma.notification.create({
        data: { ...createRandomNotification() },
      });
    } catch (error) {
      continue;
    }
  }

  for (let i = 0; i < length; i++) {
    try {
      await prisma.complaint.create({
        data: { ...createRandomComplaint() },
      });
    } catch (error) {
      continue;
    }
  }

  for (let i = 0; i < length; i++) {
    try {
      await prisma.partnerRequest.create({
        data: { ...createRandomPartnerRequest() },
      });
    } catch (error) {
      continue;
    }
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

function createRandomCategoryData(): Prisma.CategoryCreateInput {
  return {
    name: faker.lorem.word(),
  };
}

function createRandomSubCategoryData(): Prisma.SubCategoryCreateInput {
  return {
    name: faker.lorem.word(),
    category: {
      connect: {
        id: Math.floor(Math.random() * length) + 1,
      },
    },
  };
}

function createRandomVideoFileData(): Prisma.VideoFileCreateInput {
  return {
    extension: 'video/mp4',
    size: Math.floor(Math.random() * length) + 1,
    url: 'url',
  };
}

function createRandomVideoData(): Prisma.VideoCreateInput {
  return {
    name: faker.lorem.word(),
    author: {
      connect: {
        id: Math.floor(Math.random() * length) + 1,
      },
    },
    videoFile: {
      connect: {
        id: Math.floor(Math.random() * length) + 1,
      },
    },
  };
}

function createRandomCommentData(): Prisma.CommentCreateInput {
  return {
    text: faker.lorem.text(),
    user: {
      connect: {
        id: Math.floor(Math.random() * length) + 1,
      },
    },
  };
}

function createRandomLikeData(): Prisma.LikeCreateInput {
  return {
    user: {
      connect: {
        id: Math.floor(Math.random() * length) + 1,
      },
    },
  };
}

function createRandomDislikeData(): Prisma.DislikeCreateInput {
  return {
    user: {
      connect: {
        id: Math.floor(Math.random() * length) + 1,
      },
    },
  };
}

function createRandomBannerImageData(): Prisma.BannerImageCreateInput {
  return {
    extension: 'image/png',
    size: Math.floor(Math.random() * length) + 1,
    url: 'url',
  };
}

function createRandomBannerData(): Prisma.BannerCreateInput {
  return {
    bannerImage: {
      connect: {
        id: Math.floor(Math.random() * length) + 1,
      },
    },
    title: faker.lorem.word(),
    type: 'IMAGE',
    user: {
      connect: {
        id: Math.floor(Math.random() * length) + 1,
      },
    },
  };
}

function createRandomNotification(): Prisma.NotificationCreateInput {
  return {
    type: Object.values(Notifications)[
      Math.floor(Math.random() * Object.values(Notifications).length) + 1
    ],
    user: {
      connect: {
        id: Math.floor(Math.random() * length) + 1,
      },
    },
  };
}

function createRandomComplaint(): Prisma.ComplaintCreateInput {
  return {
    message: faker.lorem.text(),
    reason:
      Object.values(ComplaintReasons)[
        Math.floor(Math.random() * Object.values(ComplaintReasons).length) + 1
      ],
  };
}

function createRandomPartnerRequest(): Prisma.PartnerRequestCreateInput {
  return {
    message: faker.lorem.text(),
    user: {
      connect: {
        id: Math.floor(Math.random() * length) + 1,
      },
    },
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
