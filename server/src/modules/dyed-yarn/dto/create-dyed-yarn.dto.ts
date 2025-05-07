import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateDyedYarnDto {
    @IsString()
    @IsNotEmpty()
    color: string

    @IsString()
    @IsNotEmpty()
    colorCode: string

    @IsString()
    @IsNotEmpty()
    yarnNumber: string
    
    @IsNumber()
    @IsNotEmpty()
    packageQuantity: number

    @IsNumber()
    @IsNotEmpty()
    weight: number

    @IsDateString()
    @IsNotEmpty()
    dyingDate: Date

    @IsDateString()
    @IsNotEmpty()
    returnedDate: Date

    @IsBoolean()
    isActive: boolean

    @IsInt()
    rawMaterialsId: number
    
    @IsInt()
    dyeHouseId: number
}
