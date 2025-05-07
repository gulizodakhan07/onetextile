import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSenttodyehouseDto {
    @IsNumber()
    @IsNotEmpty()
    quantity: number

    @IsDateString()
    @IsNotEmpty()
    sentDate: Date

    @IsEnum(['Yuborildi','Jarayonda','Qabul qilindi'])
    @IsNotEmpty()
    status: ['Yuborildi','Jarayonda','Qabul qilindi']
    
    @IsString()
    @IsNotEmpty()
    notes: string

    @IsInt()
    rawMaterialsId: number

    @IsInt()
    dyeHouseId: number
}
