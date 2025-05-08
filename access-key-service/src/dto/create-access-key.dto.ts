import { IsInt, IsDateString, IsNotEmpty, Min, Max } from 'class-validator';
import { IsFutureDate } from 'src/validators/isFutureDate';

export class CreateAccessKeyDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(1000)
  rateLimit: number;

  @IsDateString()
  @IsNotEmpty()
  @IsFutureDate({ message: 'The expiration date must be in the future' })
  expiresAt: string;
}
