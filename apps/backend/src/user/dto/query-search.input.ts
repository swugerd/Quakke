import { Field, InputType, IntersectionType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { OrderInput } from 'src/utils/dto/order.input';
import { PaginationInput } from 'src/utils/dto/pagination.input';

@InputType()
export class QuerySearchInput extends IntersectionType(
  PaginationInput,
  OrderInput,
) {
  @Field({ nullable: true })
  @IsString()
  @MaxLength(256)
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(256)
  @IsOptional()
  login?: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(256)
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
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

  @Field({ nullable: true })
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
  isPartner?: boolean;

  getSearchingProperties() {
    return {
      name: this.name,
      login: this.login,
      email: this.email,
    };
  }
}
