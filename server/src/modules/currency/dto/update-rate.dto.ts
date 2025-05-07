import { IsDecimal, IsNotEmpty } from 'class-validator';

export class UpdateRateDto {
  @IsNotEmpty()
  @IsDecimal()
  newRate: number;
}
