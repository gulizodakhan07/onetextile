import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DyHouseService } from './dy-house.service';
import { CreateDyHouseDto } from './dto/create-dy-house.dto';
import { UpdateDyHouseDto } from './dto/update-dy-house.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckRoleGuard } from 'src/guard/check-role.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRoles } from 'src/utils/user-role.enum';
import { CheckAuthGuard } from 'src/guard/check-auth.guard';

@ApiTags('DyeHouse')
@Controller('dye-house')
export class DyHouseController {
  constructor(private readonly dyHouseService: DyHouseService) {}

  @Post()
  @ApiBearerAuth()
  @Roles(UserRoles.ADMIN,UserRoles.OPERATOR)
  @UseGuards(CheckAuthGuard,CheckRoleGuard)
  @ApiOperation({ summary: 'Yangi bo‘yoq zavodi qo‘shish' })
  @ApiResponse({ status: 201, description: 'Bo‘yoq zavodi yaratildi' })
  @ApiResponse({ status: 400, description: 'Bad Request: Validation xatoligi' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'ColorMax Industries' },
        contactPerson: { type: 'string', example: 'Sardor Abdullayev' },
        phoneNumber: { type: 'string', example: '+998901234567' },
        address: { type: 'string', example: 'Toshkent sh., Chilonzor tumani, 5-kvartal' },
      },
      required: ['name', 'contactPerson', 'phoneNumber', 'address'],
    },
  })
  create(@Body() createDyHouseDto: CreateDyHouseDto) {
    return this.dyHouseService.create(createDyHouseDto);
  }

  @Get()
  @Roles(UserRoles.ADMIN,UserRoles.OBSERVER,UserRoles.OPERATOR)
  @UseGuards(CheckRoleGuard)
  @ApiOperation({ summary: 'Barcha bo‘yoq zavodlarini olish' })
  @ApiResponse({ status: 200, description: 'Bo‘yoq zavodlari ro‘yxati' })
  findAll() {
    return this.dyHouseService.findAll();
  }

  @Get(':id')
  @Roles(UserRoles.ADMIN,UserRoles.OBSERVER,UserRoles.OPERATOR)
  @UseGuards(CheckRoleGuard)
  @ApiOperation({ summary: 'ID bo‘yicha bitta bo‘yoq zavodini olish' })
  @ApiResponse({ status: 200, description: 'Topilgan bo‘yoq zavodi' })
  @ApiResponse({ status: 404, description: 'Bo‘yoq zavodi topilmadi' })
  findOne(@Param('id') id: string) {
    return this.dyHouseService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRoles.ADMIN,UserRoles.OPERATOR)
  @UseGuards(CheckRoleGuard)
  @ApiOperation({ summary: 'Bo‘yoq zavodini yangilash' })
  @ApiResponse({ status: 200, description: 'Bo‘yoq zavodi yangilandi' })
  @ApiResponse({ status: 400, description: 'Bad Request: Validation xatoligi' })
  @ApiResponse({ status: 404, description: 'Yangilanayotgan zavod topilmadi' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'ColorMax Industries' },
        contactPerson: { type: 'string', example: 'Sardor Abdullayev' },
        phoneNumber: { type: 'string', example: '+998901234567' },
        address: { type: 'string', example: 'Toshkent sh., Chilonzor tumani, 5-kvartal' },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateDyHouseDto: UpdateDyHouseDto) {
    return this.dyHouseService.update(+id, updateDyHouseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Bo‘yoq zavodini o‘chirish' })
  @ApiResponse({ status: 200, description: 'Bo‘yoq zavodi muvaffaqiyatli o‘chirildi' })
  @ApiResponse({ status: 404, description: 'O‘chirilayotgan zavod topilmadi' })
  remove(@Param('id') id: string) {
    return this.dyHouseService.remove(+id);
  }
}
