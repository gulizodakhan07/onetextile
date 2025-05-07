import { Type } from "class-transformer";
import { IsArray, IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
export enum DiscountType {
    AMOUNT = 'amount',
    PERCENT = 'percent'
  }

export class CreateInvoiceDto {
    @IsDateString()
    invoiceDate: Date;
  
    @IsInt()
    clientId: number;
  
    @IsArray()
    @Type(() => Number)
    invoiceItemsId: number[];
  
    @IsNumber()
    @IsNotEmpty()
    discount: number;
  
    @IsEnum(DiscountType)
    discountType: DiscountType;
  
    @IsNumber()
    paidAmount: number;
  }