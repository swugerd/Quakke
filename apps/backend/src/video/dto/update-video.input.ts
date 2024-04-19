import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { CreateVideoInput } from './create-video.input';

@InputType()
export class UpdateVideoInput extends PartialType(CreateVideoInput) {
  @Field(() => Int)
  id: number;

  @Field(() => GraphQLUpload, { nullable: true })
  preview: Promise<FileUpload>;
}
