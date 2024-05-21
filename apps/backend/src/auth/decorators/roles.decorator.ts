import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { Role as RoleType } from '@prisma/client';
import { RolesGuard } from '../guards/role.guard';

export const ROLES_KEY = 'roles';
export const Role = (role: RoleType['name']) =>
  applyDecorators(UseGuards(RolesGuard), SetMetadata(ROLES_KEY, role));
