import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
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
      const createUserInput: CreateUserInput = {
        email: 'email@mail.ru',
        login: 'login',
        name: 'name',
        password: 'password',
      };
      const createdUser: User = {
        id: 1,
        isBanned: false,
        isPartner: false,
        roleId: 2,
        userAvatarId: null,
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...createUserInput,
      };

      jest.spyOn(prismaService.user, 'create').mockResolvedValue(createdUser);

      expect(await service.create(createUserInput)).toEqual(createdUser);
    });
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          id: 1,
          isBanned: false,
          isPartner: false,
          roleId: 2,
          userAvatarId: null,
          userId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          email: 'email@mail.ru',
          login: 'login',
          name: 'name',
          password: 'password',
        },
        {
          id: 2,
          isBanned: false,
          isPartner: false,
          roleId: 2,
          userAvatarId: null,
          userId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          email: 'email1@mail.ru',
          login: 'login1',
          name: 'name',
          password: 'password',
        },
      ];

      jest.spyOn(service, 'getAll').mockResolvedValue(users);

      expect(await service.getAll()).toEqual(users);
    });
  });

  describe('getById', () => {
    it('should return user by ID', async () => {
      const userId = 1;
      const user: User = {
        id: 1,
        isBanned: false,
        isPartner: false,
        roleId: 2,
        userAvatarId: null,
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        email: 'email@mail.ru',
        login: 'login',
        name: 'name',
        password: 'password',
      };

      jest.spyOn(service, 'getById').mockResolvedValue(user);

      expect(await service.getById(userId)).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update user by ID', async () => {
      const userId = 1;
      const updateUserInput: UpdateUserInput = {
        id: userId,
        name: 'name',
      };
      const updatedUser = {
        id: 1,
        isBanned: false,
        isPartner: false,
        roleId: 2,
        userAvatarId: null,
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...updateUserInput,
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedUser as User);

      expect(await service.update(updateUserInput)).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('should remove user by ID', async () => {
      const userId = 1;
      const removedUser: User = {
        id: userId,
        isBanned: false,
        isPartner: false,
        roleId: 2,
        userAvatarId: null,
        userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        email: 'email@mail.ru',
        login: 'login',
        name: 'name',
        password: 'password',
      };

      jest.spyOn(service, 'remove').mockResolvedValue(removedUser);

      expect(await service.remove(userId)).toEqual(removedUser);
    });
  });
});
