import { ObjectType } from '@nestjs/graphql';
import { Pagination } from '../../utils/entities/pagination.entity';
import { History } from './history.entity';

@ObjectType()
export class HistoryPagination extends Pagination(History) {}
