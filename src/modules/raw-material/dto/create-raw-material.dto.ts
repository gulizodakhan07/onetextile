import {  IsDateString, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRawMaterialDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    quantity: number

    @IsDateString()
    arrivalDate: Date

    @IsString()
    supplier: string

    @IsString()
    batchNumber: string

    @IsInt()
    sentToDyeHouseId: number



}
