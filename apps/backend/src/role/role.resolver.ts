import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => Role)
  createRole(@Args('dto') dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @Query(() => [Role])
  getRoles() {
    return this.roleService.findAll();
  }

  @Query(() => Role)
  getRole(@Args('id', { type: () => Int }) id: number) {
    return this.roleService.findOne(id);
  }

  @Mutation(() => Role)
  updateRole(@Args('dto') dto: UpdateRoleDto) {
    return this.roleService.update(dto.id, dto);
  }

  @Mutation(() => Role)
  removeRole(@Args('id', { type: () => Int }) id: number) {
    return this.roleService.remove(id);
  }
}
