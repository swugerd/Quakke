import { Test, TestingModule } from '@nestjs/testing';
import { Role, Roles } from '@prisma/client';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleService } from './role.service';

describe('RoleService', () => {
  let service: RoleService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    role: {
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
        RoleService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new role', async () => {
      const dto: CreateRoleDto = { name: Roles.ADMIN };
      const createdRole = {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...dto,
      };

      jest.spyOn(prismaService.role, 'create').mockResolvedValue(createdRole);

      expect(await service.create(dto)).toEqual(createdRole);
    });
  });

  describe('findAll', () => {
    it('should return an array of roles', async () => {
      const roles: Role[] = [
        {
          id: 1,
          name: Roles.ADMIN,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: Roles.USER,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(roles);

      expect(await service.findAll()).toEqual(roles);
    });
  });

  describe('findOne', () => {
    it('should return a role by id', async () => {
      const roleId = 1;
      const role: Role = {
        id: roleId,
        name: Roles.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(role);

      expect(await service.findOne(roleId)).toEqual(role);
    });
  });

  describe('update', () => {
    it('should update a role by id', async () => {
      const roleId = 1;
      const dto: UpdateRoleDto = {
        id: roleId,
        name: Roles.ADMIN,
      };
      const updatedRole = {
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedRole as Role);

      expect(await service.update(roleId, dto)).toEqual(updatedRole);
    });
  });

  describe('remove', () => {
    it('should remove a role by id', async () => {
      const roleId = 1;
      const removedRole: Role = {
        id: roleId,
        name: Roles.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'remove').mockResolvedValue(removedRole);

      expect(await service.remove(roleId)).toEqual(removedRole);
    });
  });
});
