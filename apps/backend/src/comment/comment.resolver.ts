import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators';
import { JwtPayload } from '../auth/interfaces';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsQuerySearchDto } from './dto/query-search.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentPagination } from './entities/comment-pagination.entity';
import { Comment } from './entities/comment.entity';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment)
  createComment(
    @Args('dto') dto: CreateCommentDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.commentService.create(dto, user);
  }

  @Query(() => [Comment])
  getComments() {
    return this.commentService.findAll();
  }

  @Query(() => CommentPagination)
  getCommentsWithQuery(@Args('query') query: CommentsQuerySearchDto) {
    return this.commentService.getAllWithQuery(query);
  }

  @Query(() => Comment)
  getComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.findOne(id);
  }

  @Mutation(() => Comment)
  updateComment(@Args('dto') dto: UpdateCommentDto) {
    return this.commentService.update(dto.id, dto);
  }

  @Mutation(() => Comment)
  removeComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.remove(id);
  }
}
