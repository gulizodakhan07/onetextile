import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DyedYarnService } from './dyed-yarn.service';
import { CreateDyedYarnDto } from './dto/create-dyed-yarn.dto';
import { UpdateDyedYarnDto } from './dto/update-dyed-yarn.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRoles } from 'src/utils/user-role.enum';
import { CheckRoleGuard } from 'src/guard/check-role.guard';
import { Roles } from 'src/decorator/roles.decorator';

@ApiTags('Dyed Yarn')
@Controller('dyed-yarn')
export class DyedYarnController {
  constructor(private readonly dyedYarnService: DyedYarnService) { }

  @Post()
  @ApiOperation({ summary: 'Bo\'yoqxonadan qaytgan tayyor ip haqidagi ma\'lumotlarni qoshish' })
  @ApiResponse({ status: 201, description: 'Bo\'yalgan ip muvaffaqiyatli qoshildi' })
  @ApiResponse({ status: 400, description: 'Bad Request: Validation error' })
  @ApiBody({
    schema: {
      properties: {
        color: { type: 'varchar', example: 'Moviy' },
        colorCode: { type: 'varchar', example: 'MV-001' },
        yarnNumber: { type: 'varchar', example: 'YN12345' },
        packageQuantity: { type: 'int', example: 25 },
        weight: { type: 'float', example: 185.5 },
        dyingDate: { type: 'date', example: '2025-04-05' },
        returnedDate: { type: 'date', example: '2025-04-07' },
        isActive: { type: 'boolean', example: true, default: true },
        rawMaterialsId: {type: 'int',example: 2},
        dyeHouseId: {type:'int',example:2}
      },
      required: ['color', 'colorCode','yarnNumber','packageQuantity','weight','dyingDate']

    },
  })
  create(@Body() createDyedYarnDto: CreateDyedYarnDto) {
    return this.dyedYarnService.create(createDyedYarnDto);
  }

  @Get()
  
  @ApiOperation({ summary: 'Barcha bo\'yoqxonadan qaytgan tayyor ip haqidagi ma\'lumotlarni olish' })
  @ApiResponse({ status: 200, description: 'Bo\'yalgan ip muvaffaqiyatli korildi' })
  @ApiResponse({ status: 404, description: 'Bo\'yoqxonadan qaytgan tayyor ip topilmadi!' })
  findAll() {
    return this.dyedYarnService.findAll();
  }

  @Get(':id')
  
  @ApiOperation({ summary: 'Faqat bitta bo\'yoqxonadan qaytgan tayyor ip haqidagi ma\'lumotlarni olish' })
  @ApiResponse({ status: 200, description: 'Bo\'yalgan ip muvaffaqiyatli korildi' })
  @ApiResponse({ status: 404, description: 'Bo\'yoqxonadan qaytgan tayyor ip topilmadi!' })
  findOne(@Param('id') id: string) {
    return this.dyedYarnService.findOne(+id);
  }

  @Patch(':id')
  
  @ApiOperation({ summary: 'Bo\'yoqxonadan qaytgan tayyor ip haqidagi ma\'lumotlarni tahrirlash' })
  @ApiResponse({ status: 200, description: 'Bo\'yalgan ip muvaffaqiyatli ozgartirildi' })
  @ApiResponse({ status: 404, description: 'Bo\'yoqxonadan qaytgan tayyor ip topilmadi!' })
  @ApiResponse({ status: 400, description: 'Bad Request: Validation error' })
  @ApiBody({
    schema: {
      properties: {
        color: { type: 'varchar', example: 'Moviy' },
        colorCode: { type: 'varchar', example: 'MV-001' },
        yarnNumber: { type: 'varchar', example: 'YN12345' },
        packageQuantity: { type: 'int', example: 25 },
        weight: { type: 'float', example: 185.5 },
        dyingDate: { type: 'date', example: '2025-04-05' },
        isActive: { type: 'boolean', example: true, default: true },
        rawMaterialsId: {type: 'int',example: 2},
        dyeHouseId: {type:'int',example:2}
      },

    },
  })
  update(@Param('id') id: string, @Body() updateDyedYarnDto: UpdateDyedYarnDto) {
    return this.dyedYarnService.update(+id, updateDyedYarnDto);
  }

  @Delete(':id')
  @Roles(UserRoles.ADMIN)
  @UseGuards(CheckRoleGuard)
  @ApiOperation({ summary: 'Bo\'yoqxonadan qaytgan tayyor ip haqidagi ma\'lumotlarni ochirish' })
  @ApiResponse({ status: 200, description: 'Bo\'yalgan ip muvaffaqiyatli ochirildi' })
  @ApiResponse({ status: 404, description: 'Bo\'yoqxonadan qaytgan tayyor ip topilmadi!' })
  remove(@Param('id') id: string) {
    return this.dyedYarnService.remove(+id);
  }
}
