import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import fieldsDescriptions from 'src/constants/fields.descriptions';
import { CreateVideoDto } from './create-video.dto';

@InputType()
export class UpdateVideoDto extends PartialType(CreateVideoDto) {
  @Field(() => Int, { description: fieldsDescriptions.id })
  id: number;
}
