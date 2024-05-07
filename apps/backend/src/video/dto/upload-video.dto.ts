import { Field, InputType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class UploadVideoDto {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}
