import { IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateSenttodyehouseDto  {
    @IsOptional()
    @IsNumber()
    quantity: number

    @IsOptional()
    @IsDateString()
    sentDate: Date

    @IsOptional()
    @IsEnum(['Yuborildi','Jarayonda','Qabul qilindi'])
    status: ['Yuborildi','Jarayonda','Qabul qilindi']
    
    @IsOptional()
    @IsString()
    notes: string

    @IsInt()
    @IsOptional()
    rawMaterialsId: number

    @IsInt()
    @IsOptional()
    dyeHouseId: number


}

