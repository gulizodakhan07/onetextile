import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RawMaterialService } from './raw-material.service';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Roles } from 'src/decorator/roles.decorator';
import { CheckRoleGuard } from 'src/guard/check-role.guard';
import { UserRoles } from 'src/utils/user-role.enum';
import { CheckAuthGuard } from 'src/guard/check-auth.guard';

@ApiTags('Raw Material') 
@Controller('raw-material')
export class RawMaterialController {
  constructor(private readonly rawMaterialService: RawMaterialService) { }

  @Post()
  @ApiBearerAuth() 
  @Roles(UserRoles.ADMIN,UserRoles.OPERATOR)
  @UseGuards(CheckAuthGuard,CheckRoleGuard)
  @ApiOperation({ summary: 'Yangi xomashyo qo‘shish' })
  @ApiResponse({ status: 201, description: 'Xomashyo yaratildi' })
  @ApiResponse({ status: 400, description: 'Bad Request: Validation failed' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Furda' },
        quantity: { type: 'number', example: 100 },
        arrivalDate: { type: 'string', format: 'date', example: '2025-04-09' },
        supplier: { type: 'string', example: 'ABC Supplier Ltd.' },
        batchNumber: { type: 'string', example: 'BATCH-2025-04' },
      },
      required: ['name', 'quantity', 'arrivalDate', 'supplier', 'batchNumber'],
    }
  })
  create(@Body() createRawMaterialDto: CreateRawMaterialDto) {
    return this.rawMaterialService.create(createRawMaterialDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha xomashyolar ro‘yxati' })
  @ApiResponse({ status: 200, description: 'Xomashyolar ro‘yxati' })
  findAll() {
    return this.rawMaterialService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha xomashyo olish' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Xomashyo topildi' })
  @ApiResponse({ status: 404, description: 'Xomashyo topilmadi' })
  findOne(@Param('id') id: string) {
    return this.rawMaterialService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(CheckAuthGuard,CheckRoleGuard)
  @ApiBearerAuth() 
  @Roles(UserRoles.ADMIN,UserRoles.OPERATOR)
  @ApiOperation({ summary: 'Xomashyoni yangilash' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Furda Premium' },
        quantity: { type: 'number', example: 150 },
        arrivalDate: { type: 'string', format: 'date', example: '2025-04-10' },
        supplier: { type: 'string', example: 'New Supplier Co.' },
        batchNumber: { type: 'string', example: 'BATCH-2025-05' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Xomashyo yangilandi' })
  @ApiResponse({ status: 400, description: 'Bad Request: Validation failed' })
  @ApiResponse({ status: 404, description: 'Xomashyo topilmadi' })

  update(
    @Param('id') id: string,
    @Body() updateRawMaterialDto: UpdateRawMaterialDto,
  ) {
    return this.rawMaterialService.update(+id, updateRawMaterialDto);
  }

  @Delete(':id')
  @UseGuards(CheckAuthGuard,CheckRoleGuard)
  @ApiBearerAuth() 
  @Roles(UserRoles.ADMIN)
  @ApiOperation({ summary: 'Xomashyoni o‘chirish' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Xomashyo o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Xomashyo topilmadi' })
  remove(@Param('id') id: string) {
    return this.rawMaterialService.remove(+id);
  }
}
