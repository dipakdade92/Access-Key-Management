import { IsInt, IsDateString, IsNotEmpty, Min } from 'class-validator';

export class CreateAccessKeyDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  rateLimit: number;

  @IsDateString()
  @IsNotEmpty()
  expiresAt: string; 
}
