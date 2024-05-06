import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators';
import { JwtPayload } from 'src/auth/interfaces';
import { CreatePartnerRequestInput } from './dto/create-partner-request.input';
import { UpdatePartnerRequestInput } from './dto/update-partner-request.input';
import { PartnerRequest } from './entities/partner-request.entity';
import { PartnerRequestService } from './partner-request.service';

@Resolver(() => PartnerRequest)
export class PartnerRequestResolver {
  constructor(private readonly partnerRequestService: PartnerRequestService) {}

  @Mutation(() => PartnerRequest)
  createPartnerRequest(
    @Args('createPartnerRequestInput')
    createPartnerRequestInput: CreatePartnerRequestInput,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.partnerRequestService.create(
      createPartnerRequestInput,
      user.id,
    );
  }

  @Query(() => [PartnerRequest])
  getPartnerRequests() {
    return this.partnerRequestService.findAll();
  }

  @Query(() => PartnerRequest)
  getPartnerRequest(@Args('id', { type: () => Int }) id: number) {
    return this.partnerRequestService.findOne(id);
  }

  @Mutation(() => PartnerRequest)
  updatePartnerRequest(
    @Args('updatePartnerRequestInput')
    updatePartnerRequestInput: UpdatePartnerRequestInput,
  ) {
    return this.partnerRequestService.update(
      updatePartnerRequestInput.id,
      updatePartnerRequestInput,
    );
  }

  @Mutation(() => PartnerRequest)
  removePartnerRequest(@Args('id', { type: () => Int }) id: number) {
    return this.partnerRequestService.remove(id);
  }
}
