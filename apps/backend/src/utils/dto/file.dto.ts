import { Field, InputType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class FileDto {
  @Field(() => GraphQLUpload, { description: 'File to upload' })
  file?: Promise<FileUpload>;
}
