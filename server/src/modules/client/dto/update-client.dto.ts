import { IsEmail, IsOptional, IsString } from "class-validator"

export class UpdateClientDto {
    @IsString()
    @IsOptional()
    firstName: string

    @IsString()
    @IsOptional()
    lastName: string

    @IsString()
    @IsOptional()
    address: string

    @IsString()
    @IsOptional()
    phoneNumber: string

    @IsEmail()
    @IsOptional()
    email: string

    @IsString()
    @IsOptional()
    companyName: string

    @IsString()
    @IsOptional()
    tin: string
}
