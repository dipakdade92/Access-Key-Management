import { IsInt, IsOptional, IsDateString, Min, Max } from 'class-validator';
import { IsFutureDate } from 'src/validators/isFutureDate';

export class UpdateAccessKeyDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(1000)
  rateLimit?: number;

  @IsOptional()
  @IsDateString()
  @IsFutureDate({ message: 'The expiration date must be in the future' })
  expiresAt?: string;
}
