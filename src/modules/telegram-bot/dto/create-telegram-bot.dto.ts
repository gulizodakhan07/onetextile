import { IsString, IsNumber } from 'class-validator';

export class CreateTelegramBotDto {
  @IsString()
  invoiceNumber: string;

  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  currentBalance: number;

  @IsNumber()
  totalBalance: number;

  @IsNumber()
  debt: number;

  @IsString()
  phone: string;
}