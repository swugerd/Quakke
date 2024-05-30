import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/decorators';
import { JwtPayload } from '../auth/interfaces';
import { CreatePartnerRequestDto } from './dto/create-partner-request.dto';
import { PartnerRequestQuerySearchDto } from './dto/query-search.dto';
import { UpdatePartnerRequestDto } from './dto/update-partner-request.dto';
import { PartnerRequestPagination } from './entities/partner-request-pagination.entity';
import { PartnerRequest } from './entities/partner-request.entity';
import { PartnerRequestService } from './partner-request.service';

@Resolver(() => PartnerRequest)
export class PartnerRequestResolver {
  constructor(private readonly partnerRequestService: PartnerRequestService) {}

  @Mutation(() => PartnerRequest)
  createPartnerRequest(
    @Args('dto')
    dto: CreatePartnerRequestDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.partnerRequestService.create(dto, user.id);
  }

  @Query(() => [PartnerRequest])
  getPartnerRequests() {
    return this.partnerRequestService.findAll();
  }

  @Query(() => PartnerRequestPagination)
  getPartnerRequestsWithQuery(
    @Args('query') query: PartnerRequestQuerySearchDto,
  ) {
    return this.partnerRequestService.getAllWithQuery(query);
  }

  @Query(() => PartnerRequest)
  getPartnerRequest(@Args('id', { type: () => Int }) id: number) {
    return this.partnerRequestService.findOne(id);
  }

  @Mutation(() => PartnerRequest)
  updatePartnerRequest(
    @Args('dto')
    dto: UpdatePartnerRequestDto,
  ) {
    return this.partnerRequestService.update(dto.id, dto);
  }

  @Mutation(() => PartnerRequest)
  removePartnerRequest(@Args('id', { type: () => Int }) id: number) {
    return this.partnerRequestService.remove(id);
  }
}
