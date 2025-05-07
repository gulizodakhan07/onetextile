// create-receivable.dto.ts
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaymentStatus } from 'src/modules/invoice/entities/invoice.entity';

export class CreateReceivableDto {
  @IsString()
  @IsNotEmpty()
  supplier: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  dueDate: Date;

  @IsOptional()
  @IsDateString()
  paymentDate?: Date;

  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
}
