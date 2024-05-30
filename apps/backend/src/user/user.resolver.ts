import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../src/auth/decorators';
import { JwtPayload } from '../auth/interfaces';
import { FileDto } from '../utils/dto/file.dto';
import { FileEntity } from '../utils/entities/file.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { QuerySearchDto } from './dto/query-search.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPagination } from './entities/user-pagination.entity';
import { User } from './entities/user.entity';
import { ProfileResponse } from './responses/profile-response';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  getUsers() {
    return this.userService.getAll();
  }

  @Query(() => UserPagination)
  getUsersWithQuery(@Args('query') query: QuerySearchDto) {
    return this.userService.getAllWithQuery(query);
  }

  @Mutation(() => FileEntity)
  uploadAvatar(@Args('file') file: FileDto) {
    return this.userService.uploadFile(file);
  }

  @Mutation(() => FileEntity)
  dropAvatar(@Args('id', { type: () => Int }) id: number) {
    return this.userService.deleteFile(id);
  }

  @Query(() => User)
  getUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getById(id);
  }

  @Query(() => ProfileResponse)
  getMe(@CurrentUser() user: JwtPayload) {
    return user;
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }

  @Mutation(() => User)
  createUser(@Args('dto') dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Mutation(() => User)
  updateUser(@Args('dto') dto: UpdateUserDto) {
    return this.userService.update(dto);
  }
}
