import { Field, InputType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class FileInput {
  @Field(() => GraphQLUpload)
  file?: Promise<FileUpload>;
}
