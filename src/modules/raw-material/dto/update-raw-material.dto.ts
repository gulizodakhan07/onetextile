import {  IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRawMaterialDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsDateString()
  @IsOptional()
  arrivalDate?: Date;

  @IsString()
  @IsOptional()
  supplier?: string;

  @IsString()
  @IsOptional()
  batchNumber?: string;
}
