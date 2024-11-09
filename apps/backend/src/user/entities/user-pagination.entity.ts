import { ObjectType } from '@nestjs/graphql';
import { Pagination } from '../../utils/entities/pagination.entity';
import { User } from './user.entity';

@ObjectType()
export class UserPagination extends Pagination(User) {}
