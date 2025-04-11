import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SenttodyehouseService } from './senttodyehouse.service';
import { CreateSenttodyehouseDto } from './dto/create-senttodyehouse.dto';
import { UpdateSenttodyehouseDto } from './dto/update-senttodyehouse.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckRoleGuard } from 'src/guard/check-role.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRoles } from 'src/utils/user-role.enum';

@ApiTags('Sent to dye house')
@Controller('senttodyehouse')
export class SenttodyehouseController {
  constructor(private readonly senttodyehouseService: SenttodyehouseService) {}

  @Post()
  
  @Roles(UserRoles.ADMIN,UserRoles.OBSERVER)
  @UseGuards(CheckRoleGuard)
  @ApiOperation({summary: 'Mahsulotni boyoq zavodiga yuborish'})
  @ApiResponse({status: 201,description: 'Mahsulot muvaffaqiyatli boyoq zavodiga yuborildi!'})
  @ApiResponse({status: 400,description: 'BAd Request: Validation failed'})
  @ApiBody({
    schema:{
      properties: {
        quantity: {type: 'int',example: 150},
        sentDate: {type: 'date',example:'2025-04-08'},
        status: {type: 'enum',enum: ['Yuborildi','Jarayonda','Qabul qilindi'],example: 'Yuborildi'},
        notes: {type: 'string',example: 'Birinchi partiya boyoq uchun yuborildi'},
        rawMaterialsId: {type:'int',example: 2},
        dyeHouseId: {type:'int',example:2}
      },
      required: ['quantity','sentDate','status','notes']
    }
  })
  create(@Body() createSenttodyehouseDto: CreateSenttodyehouseDto) {
    return this.senttodyehouseService.create(createSenttodyehouseDto);
  }

  @Get()
  @ApiOperation({summary: 'Barcha yuborilgan mahsulotlarni olish'})
  @ApiResponse({status: 200,description:'Yuborilgan mahsulotlar muvaffaqiyatli korildi'})
  @ApiResponse({status: 404,description: 'Yuborilgan mahsulotlar topilmadi'})
  findAll() {
    return this.senttodyehouseService.findAll();
  }

  @Get(':id')
  
  @ApiOperation({summary: 'Bitta yuborilgan mahsulotni olish'})
  @ApiResponse({status: 200,description:'Yuborilgan mahsulot muvaffaqiyatli korildi'})
  @ApiResponse({status: 404,description: 'Yuborilgan mahsulot topilmadi'})

  findOne(@Param('id') id: string) {
    return this.senttodyehouseService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRoles.ADMIN,UserRoles.OBSERVER)
  @UseGuards(CheckRoleGuard)
  @ApiOperation({summary: 'Yuborilgan mahsulotlarni tahrirlash'})
  @ApiResponse({status: 200,description: 'Yuborilgan mahsulotlar muvaffaqiyatli ozgartirildi'})
  @ApiResponse({status:404,description: 'Yuborilgan mahsulot topilmadi'})
  @ApiResponse({status:400,description:'Bad REquest: Validation error'})
  @ApiBody({
    schema:{
      properties:{
        quantity: {type: 'int',example: 120},
        sentDate: {type: 'date',example: '2025-03-10'},
        status: {type: 'enum',enum: ['Yuborildi','Jarayonda','Qabul qilindi'],example: 'Qabul qilindi'},
        notes: {type:'varchar',example: 'Ikkinchi partiya boyoq uchun yuborildi'},
        rawMaterialsId: {type:'int',example: 2},
        dyeHouseId: {type:'int',example:2}

      }
    }
  })
  update(@Param('id') id: string, @Body() updateSenttodyehouseDto: UpdateSenttodyehouseDto) {
    return this.senttodyehouseService.update(+id, updateSenttodyehouseDto);
  }

  @Delete(':id')
  
  @Roles(UserRoles.ADMIN)
  @UseGuards(CheckRoleGuard)
  @ApiResponse({status: 200,description: 'Muvaffaqiyatli ochirildi'})
  @ApiResponse({status:404,description: 'Yuborilgan mahsulot topilmadi'})
  remove(@Param('id') id: string) {
    return this.senttodyehouseService.remove(+id);
  }
}
