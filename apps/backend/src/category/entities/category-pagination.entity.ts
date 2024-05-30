import { ObjectType } from '@nestjs/graphql';
import { Pagination } from '../../utils/entities/pagination.entity';
import { Category } from './category.entity';

@ObjectType()
export class CategoryPagination extends Pagination(Category) {}
