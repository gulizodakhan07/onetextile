import { IsNotEmpty, IsString } from "class-validator"

export class CreateDyHouseDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    contactPerson: string

    @IsString()
    @IsNotEmpty()
    phoneNumber: string

    @IsString()
    @IsNotEmpty()
    address: string
}
