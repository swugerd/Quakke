import { ObjectType } from '@nestjs/graphql';
import { Pagination } from 'src/utils/entities/pagination.entity';
import { Video } from './video.entity';

@ObjectType()
export class VideoPagination extends Pagination(Video) {}
