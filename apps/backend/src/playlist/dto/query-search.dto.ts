import { Field, InputType, IntersectionType } from '@nestjs/graphql';
import { Privacy } from '@prisma/client';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { OrderDto } from 'src/utils/dto/order.input';
import { PaginationDto } from 'src/utils/dto/pagination.dto';

@InputType()
export class QuerySearchDto extends IntersectionType(PaginationDto, OrderDto) {
  @Field(() => String, { nullable: true })
  @IsString()
  @MaxLength(256)
  @IsOptional()
  name?: string;

  @Field(() => Privacy, { nullable: true })
  @IsString()
  @MaxLength(256)
  @IsOptional()
  privacy?: Privacy;
}
