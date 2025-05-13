// src/modules/inventory/dto/get-all-products.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetAllProductsDto {
  @ApiPropertyOptional({ description: 'Mahsulot turi: raw yoki dyed' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ description: 'Mahsulot nomi bo‘yicha izlash(faqat raw uchun)' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Rang bo‘yicha izlash (faqat dyed uchun)' })
  @IsOptional()
  @IsString()
  color?: string;
}
