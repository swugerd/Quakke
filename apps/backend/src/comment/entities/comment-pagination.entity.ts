import { ObjectType } from '@nestjs/graphql';
import { Pagination } from '../../utils/entities/pagination.entity';
import { Comment } from './comment.entity';

@ObjectType()
export class CommentPagination extends Pagination(Comment) {}
