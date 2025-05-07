import { IsBoolean, IsDateString, IsInt, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateDyedYarnDto{
    @IsString()
    @IsOptional()
    color: string

    @IsString()
    @IsOptional()
    colorCode: string

    @IsString()
    @IsOptional()
    yarnNumber: string

    @IsNumber()
    @IsOptional()
    weight: number
    
    @IsNumber()
    @IsOptional()
    packageQuantity: number

    @IsDateString()
    @IsOptional()
    dyingDate: Date

    @IsDateString()
    @IsOptional()
    returnedDate: Date

    @IsBoolean()
    @IsOptional()
    isActive: boolean

    @IsInt()
    @IsOptional()
    rawMaterialsId: number

    
    @IsInt()
    @IsOptional()
    dyeHouseId: number

}
