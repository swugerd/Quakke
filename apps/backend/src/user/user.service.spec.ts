import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Roles } from '@prisma/client';
import { FileService } from '../file/file.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

const userData = {
  banners: [],
  comments: [],
  complaints: [],
  dislikes: [],
  history: [],
  likes: [],
  notifications: [],
  partnerRequests: [],
  playlists: [],
  role: {
    id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: Roles.USER,
  },
  selectedCategories: [],
  settings: [],
  subscribers: [],
  userAvatar: null,
  videos: [],
};

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        FileService,
        ConfigService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const dto: CreateUserDto = {
        email: 'email@mail.ru',
        login: 'login',
        name: 'name',
        password: 'password',
      };

      const createdUser = {
        id: 1,
        isBanned: false,
        isPartner: false,
        roleId: 2,
        userAvatarId: null,
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...userData,
        ...dto,
      };

      jest.spyOn(prismaService.user, 'create').mockResolvedValue(createdUser);

      expect(await service.create(dto)).toEqual(createdUser);
    });
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: 1,
          email: 'email@mail.ru',
          login: 'login',
          name: 'name',
          password: 'password',
          isBanned: false,
          isPartner: false,
          roleId: 2,
          userAvatarId: null,
          userId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          ...userData,
        },
      ];

      jest.spyOn(service, 'getAll').mockResolvedValue(users);

      expect(await service.getAll()).toEqual(users);
    });
  });

  describe('getById', () => {
    it('should return user by id', async () => {
      const userId = 1;

      const user = {
        id: userId,
        email: 'email@mail.ru',
        login: 'login',
        name: 'name',
        password: 'password',
        isBanned: false,
        isPartner: false,
        roleId: 2,
        userAvatarId: null,
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...userData,
      };

      jest.spyOn(service, 'getById').mockResolvedValue(user);

      expect(await service.getById(userId)).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update user by id', async () => {
      const dto = {
        id: 1,
        email: 'email@mail.ru',
        login: 'login',
        name: 'name',
        password: 'password',
      };

      const updatedUser = {
        isBanned: false,
        isPartner: false,
        roleId: 2,
        userAvatarId: null,
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...userData,
        ...dto,
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedUser);

      expect(await service.update(dto)).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('should remove user by id', async () => {
      const userId = 1;

      const removedUser = {
        id: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        email: 'email@mail.ru',
        login: 'login',
        name: 'name',
        password: 'password',
        isBanned: false,
        isPartner: false,
        roleId: 2,
        userAvatarId: null,
        userId: null,
        ...userData,
      };

      jest.spyOn(service, 'remove').mockResolvedValue(removedUser);

      expect(await service.remove(userId)).toEqual(removedUser);
    });
  });
});
