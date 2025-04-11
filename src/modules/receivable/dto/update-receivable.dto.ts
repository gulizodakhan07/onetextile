import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { PaymentStatus } from "src/modules/invoice/entities/invoice.entity";

export class UpdateReceivableDto{
    @IsString()
  @IsOptional()
  supplier: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  amount: number;

  @IsDateString()
  @IsOptional()
  dueDate: Date;

  @IsOptional()
  @IsDateString()
  paymentDate?: Date;

  @IsEnum(PaymentStatus)
  @IsOptional()
  paymentStatus: PaymentStatus;
}
