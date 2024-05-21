import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ComplaintService } from './complaint.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { ComplaintQuerySearchDto } from './dto/query-search.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { ComplaintPagination } from './entities/complaint-pagination.entity';
import { Complaint } from './entities/complaint.entity';

@Resolver(() => Complaint)
export class ComplaintResolver {
  constructor(private readonly complaintService: ComplaintService) {}

  @Mutation(() => Complaint)
  createComplaint(@Args('dto') dto: CreateComplaintDto) {
    return this.complaintService.create(dto);
  }

  @Query(() => [Complaint])
  getComplaints() {
    return this.complaintService.findAll();
  }

  @Query(() => ComplaintPagination)
  getComplaintsWithQuery(@Args('query') query: ComplaintQuerySearchDto) {
    return this.complaintService.getAllWithQuery(query);
  }

  @Query(() => Complaint)
  getComplaint(@Args('id', { type: () => Int }) id: number) {
    return this.complaintService.findOne(id);
  }

  @Mutation(() => Complaint)
  updateComplaint(@Args('dto') dto: UpdateComplaintDto) {
    return this.complaintService.update(dto.id, dto);
  }

  @Mutation(() => Complaint)
  removeComplaint(@Args('id', { type: () => Int }) id: number) {
    return this.complaintService.remove(id);
  }
}
