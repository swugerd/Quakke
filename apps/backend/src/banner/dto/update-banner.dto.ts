import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateBannerDto } from './create-banner.dto';

@InputType()
export class UpdateBannerDto extends PartialType(CreateBannerDto) {
  @Field(() => Int)
  id: number;
}
