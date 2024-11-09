import { Field, InputType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import fieldsDescriptions from 'src/constants/fields.descriptions';

@InputType()
export class UploadVideoDto {
  @Field(() => GraphQLUpload, { description: fieldsDescriptions.video.file })
  file: Promise<FileUpload>;
}
