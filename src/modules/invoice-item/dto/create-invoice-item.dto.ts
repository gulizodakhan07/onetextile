import { IsInt, IsNumber, IsOptional } from "class-validator";

export class CreateInvoiceItemDto {
    @IsInt()
    dyedYarnId: number;
  
    @IsInt()
    @IsOptional()
    invoiceId: number
    
    @IsNumber()
    quantity: number;
  
    @IsNumber()
    unitPrice: number;
  }