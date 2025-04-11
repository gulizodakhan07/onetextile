import { IsOptional, IsString } from "class-validator"

export class UpdateDyHouseDto {
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    contactPerson: string

    @IsString()
    @IsOptional()
    phoneNumber: string

    @IsString()
    @IsOptional()
    address: string

}
