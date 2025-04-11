import { IsInt, IsNumber } from "class-validator";

export class CreateInvoiceItemDto {
    @IsInt()
    dyedYarnId: number;
  
    @IsInt()
    invoiceId: number
    
    @IsNumber()
    quantity: number;
  
    @IsNumber()
    unitPrice: number;
  }