import { Controller, Get, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Receivable } from 'src/modules/receivable/entities/receivable.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { RawMaterial } from 'src/modules/raw-material/entities/raw-material.entity';
import { DyedYarn } from 'src/modules/dyed-yarn/entities/dyed-yarn.entity';
import { GetAllProductsDto } from './products.dto';

@ApiTags('Inventory')  
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @ApiOperation({ summary: 'Barcha mahsulotlarni olish' })  
  @ApiResponse({
    status: 200,
    description: 'Mahsulotlar muvaffaqiyatli olingan',
    type: Object, 
  })
  @Get('products')
  async getAllProducts(@Query() query: GetAllProductsDto) {
    return this.inventoryService.getAllProducts(query.type, query.name, query.color);
  }

  @ApiOperation({ summary: 'Mahsulotning kirim-chiqim tarixini olish' }) 
  @ApiResponse({
    status: 200,
    description: 'Mahsulotning kirim-chiqim tarixini muvaffaqiyatli olingan',
    type: Object,
  })
  @Get('product-movement')
  async getProductMovement(
    @Query('supplier') supplier: string,
  ) {
    return this.inventoryService.getProductMovement(supplier);
  }
}
