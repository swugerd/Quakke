import { ObjectType } from '@nestjs/graphql';
import { Pagination } from 'src/utils/entities/pagination.entity';
import { Comment } from './comment.entity';

@ObjectType()
export class CommentPagination extends Pagination(Comment) {}
