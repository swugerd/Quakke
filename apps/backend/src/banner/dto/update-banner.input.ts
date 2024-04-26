import { CreateBannerInput } from './create-banner.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBannerInput extends PartialType(CreateBannerInput) {
  @Field(() => Int)
  id: number;
}
