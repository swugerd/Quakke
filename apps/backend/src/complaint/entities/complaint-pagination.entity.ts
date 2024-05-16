import { ObjectType } from '@nestjs/graphql';
import { Pagination } from 'src/utils/entities/pagination.entity';
import { Complaint } from './complaint.entity';

@ObjectType()
export class ComplaintPagination extends Pagination(Complaint) {}
