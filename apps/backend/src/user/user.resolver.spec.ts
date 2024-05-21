import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;

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
    service = module.get<UserService>(UserService);
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

      jest.spyOn(service, 'create').mockResolvedValue(createdUser);

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

      jest.spyOn(service, 'getAll').mockResolvedValue(users);

      expect(await resolver.getUsers()).toEqual(users);
    });
  });

  describe('getUser', () => {
    it('should return user by Int', async () => {
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

      expect(await resolver.getUser(userId)).toEqual(user);
    });
  });

  describe('updateUser', () => {
    it('should update user by Int', async () => {
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

      jest.spyOn(service, 'update').mockResolvedValue(updatedUser as User);

      expect(await resolver.updateUser(dto)).toEqual(updatedUser);
    });
  });

  describe('removeUser', () => {
    it('should remove user by Int', async () => {
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

      expect(await resolver.removeUser(userId)).toEqual(removedUser);
    });
  });
});
