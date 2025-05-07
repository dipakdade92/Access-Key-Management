import { IsInt, IsOptional, IsDateString, Min } from 'class-validator';

export class UpdateAccessKeyDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  rateLimit?: number;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
