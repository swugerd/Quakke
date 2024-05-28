import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { TagService } from './tag.service';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Mutation(() => Tag)
  createTag(@Args('dto') dto: CreateTagDto) {
    return this.tagService.create(dto);
  }

  @Query(() => [Tag])
  getTags() {
    return this.tagService.findAll();
  }

  @Query(() => Tag)
  getTag(@Args('id', { type: () => Int }) id: number) {
    return this.tagService.findOne(id);
  }

  @Mutation(() => Tag)
  updateTag(@Args('dto') dto: UpdateTagDto) {
    return this.tagService.update(dto.id, dto);
  }

  @Mutation(() => Tag)
  removeTag(@Args('id', { type: () => Int }) id: number) {
    return this.tagService.remove(id);
  }
}
