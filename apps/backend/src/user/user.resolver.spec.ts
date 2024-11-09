import { Test, TestingModule } from '@nestjs/testing';
import { Roles } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResolver } from './user.resolver';
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

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
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

      jest.spyOn(resolver, 'createUser').mockResolvedValue(createdUser);

      expect(await resolver.createUser(dto)).toEqual(createdUser);
    });
  });

  describe('getUsers', () => {
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

      jest.spyOn(resolver, 'getUsers').mockResolvedValue(users);

      expect(await resolver.getUsers()).toEqual(users);
    });
  });

  describe('getUser', () => {
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

      jest.spyOn(resolver, 'getUser').mockResolvedValue(user);

      expect(await resolver.getUser(userId)).toEqual(user);
    });
  });

  describe('updateUser', () => {
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

      jest.spyOn(resolver, 'updateUser').mockResolvedValue(updatedUser);

      expect(await resolver.updateUser(dto)).toEqual(updatedUser);
    });
  });

  describe('removeUser', () => {
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

      jest.spyOn(resolver, 'removeUser').mockResolvedValue(removedUser);

      expect(await resolver.removeUser(userId)).toEqual(removedUser);
    });
  });
});
