import { Module } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { ComplaintResolver } from './complaint.resolver';

@Module({
  providers: [ComplaintResolver, ComplaintService],
})
export class ComplaintModule {}
