import { Field, InputType, IntersectionType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { OrderDto } from 'src/utils/dto/order.input';
import { PaginationDto } from 'src/utils/dto/pagination.dto';

@InputType()
export class VideoQuerySearchDto extends IntersectionType(
  PaginationDto,
  OrderDto,
) {
  @Field(() => String, { nullable: true })
  @IsString()
  @MaxLength(256)
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @MaxLength(256)
  @IsOptional()
  description?: string;

  @Field(() => Boolean, { nullable: true })
  @Transform(({ value }) => {
    switch (value) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return value;
    }
  })
  @IsBoolean()
  @IsOptional()
  isBanned?: boolean;
}
