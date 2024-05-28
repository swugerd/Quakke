import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            getAll: jest.fn(),
            getById: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserInput: CreateUserDto = {
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
        ...createUserInput,
      };

      jest.spyOn(resolver, 'createUser').mockResolvedValue(createdUser);

      expect(await resolver.createUser(createUserInput)).toEqual(createdUser);
    });
  });

  describe('getUsers', () => {
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

      jest.spyOn(resolver, 'getUsers').mockResolvedValue(users);

      expect(await resolver.getUsers()).toEqual(users);
    });
  });

  describe('getUser', () => {
    it('should return user by id', async () => {
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

      jest.spyOn(resolver, 'getUser').mockResolvedValue(user);

      expect(await resolver.getUser(userId)).toEqual(user);
    });
  });

  describe('updateUser', () => {
    it('should update user by id', async () => {
      const userId = 1;
      const dto: UpdateUserDto = {
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
        ...dto,
      };

      jest.spyOn(resolver, 'updateUser').mockResolvedValue(updatedUser as User);

      expect(await resolver.updateUser(dto)).toEqual(updatedUser);
    });
  });

  describe('removeUser', () => {
    it('should remove user by id', async () => {
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

      jest.spyOn(resolver, 'removeUser').mockResolvedValue(removedUser);

      expect(await resolver.removeUser(userId)).toEqual(removedUser);
    });
  });
});
