import { ApiBody } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"


export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsString()
    @IsNotEmpty()
    address: string

    @IsString()
    @IsNotEmpty()
    phoneNumber: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    companyName: string

    @IsString()
    @IsNotEmpty()
    tin: string
}
