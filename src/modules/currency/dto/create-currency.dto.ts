import { IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CurrencyType } from '../entities/currency.entity';

export class CreateCurrencyDto {
  @IsEnum(CurrencyType)
  code: CurrencyType;

  @IsNumber()
  currentRate: number;
}