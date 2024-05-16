import { Field, InputType, IntersectionType } from '@nestjs/graphql';
import { ComplaintReasons } from '@prisma/client';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { OrderDto } from 'src/utils/dto/order.input';
import { PaginationDto } from 'src/utils/dto/pagination.dto';

@InputType()
export class QuerySearchDto extends IntersectionType(PaginationDto, OrderDto) {
  @Field(() => ComplaintReasons, { nullable: true })
  @IsString()
  @MaxLength(256)
  @IsOptional()
  reason?: ComplaintReasons;

  @Field(() => String)
  @IsString()
  @MaxLength(256)
  @IsOptional()
  message: string;
}
