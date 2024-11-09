import { ObjectType } from '@nestjs/graphql';
import { Pagination } from '../../utils/entities/pagination.entity';
import { PartnerRequest } from './partner-request.entity';

@ObjectType()
export class PartnerRequestPagination extends Pagination(PartnerRequest) {}
