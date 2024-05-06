import { Module } from '@nestjs/common';
import { PartnerRequestService } from './partner-request.service';
import { PartnerRequestResolver } from './partner-request.resolver';

@Module({
  providers: [PartnerRequestResolver, PartnerRequestService],
})
export class PartnerRequestModule {}
