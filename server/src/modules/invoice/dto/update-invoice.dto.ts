import { Type } from "class-transformer";
import { IsArray, IsDateString, IsEnum, IsInt, IsNumber, IsOptional } from "class-validator";

export class UpdateInvoiceDto{
    @IsDateString()
    @IsOptional()
    invoiceDate?: Date;
  
    @IsInt()
    @IsOptional()
    clientId?: number;
  
    @IsArray()
    @Type(() => Number)
    @IsOptional()
    invoiceItemsId?: number[];
  
    @IsNumber()
    @IsOptional()
    discount?: number;
  
    @IsEnum(['amount', 'percent'])
    @IsOptional()
    discountType?: 'amount' | 'percent';
  
    @IsNumber()
    @IsOptional()
    paidAmount?: number;
}
