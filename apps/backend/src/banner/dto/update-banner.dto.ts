import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import fieldsDescriptions from '../../constants/fields.descriptions';
import { CreateBannerDto } from './create-banner.dto';

@InputType()
export class UpdateBannerDto extends PartialType(CreateBannerDto) {
  @Field(() => Int, { description: fieldsDescriptions.id })
  id: number;
}
