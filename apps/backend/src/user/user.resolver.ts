import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtPayload } from 'src/auth/interfaces';
import { CurrentUser } from '../../src/auth/decorators';
import { CreateUserInput } from './dto/create-user.input';
import { QuerySearchInput } from './dto/query-search.input';
import { UpdateUserInput } from './dto/update-user.input';
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
  getUsersWithQuery(@Args('query') query: QuerySearchInput) {
    return this.userService.getAllWithQuery(query);
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
  createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Mutation(() => User)
  updateUser(@Args('input') input: UpdateUserInput) {
    return this.userService.update(input);
  }
}
