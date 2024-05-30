import { ObjectType } from '@nestjs/graphql';
import { Pagination } from '../../utils/entities/pagination.entity';
import { Complaint } from './complaint.entity';

@ObjectType()
export class ComplaintPagination extends Pagination(Complaint) {}
