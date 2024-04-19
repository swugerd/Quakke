import { Field, InputType } from '@nestjs/graphql';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreateVideoInput {
  @Field(() => String)
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => GraphQLUpload)
  video: Promise<FileUpload>;
}
