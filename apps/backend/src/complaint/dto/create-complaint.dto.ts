import { Field, InputType, Int } from '@nestjs/graphql';
import { ComplaintReasons } from '@prisma/client';

@InputType()
export class CreateComplaintDto {
  @Field(() => ComplaintReasons)
  reason: ComplaintReasons;

  @Field(() => String)
  message: string;

  @Field(() => Int, { nullable: true })
  userId?: number;

  @Field(() => Int, { nullable: true })
  videoId?: number;
}
