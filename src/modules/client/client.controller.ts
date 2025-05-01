import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/roles.decorator';
import { CheckRoleGuard } from 'src/guard/check-role.guard';
import { UserRoles } from 'src/utils/user-role.enum';
import { CheckAuthGuard } from 'src/guard/check-auth.guard';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @Roles(UserRoles.ADMIN,UserRoles.OPERATOR)
  @ApiBearerAuth() 
  @UseGuards(CheckAuthGuard,CheckRoleGuard)
  @ApiOperation({summary: 'Mijozlar haqidagi malumotlarni yaratish'})
  @ApiResponse({status: 201,description: 'Mijoz muvaffaqiyatli yaratildi'})
  @ApiResponse({status: 400,description: 'Bad Request: Validation error!'})
  @ApiBody({
    schema:{
      properties:{
        firstName: {type: 'varchar',example: 'Nodir'},
        lastName: {type: 'varchar',example: 'Shokirov'},
        address: {type: 'varchar',example: 'Namangan vil. Pop tum. Dostlik koch. 12-uy'},
        phoneNumber: {type: 'varchar',example: '+998959635252'},
        companyName: {type: 'varchar',example: 'Nodirbek Group LLC',description: 'Agar yuridik shaxs bolsa companiya nomi kiriting(optional)'},
        tin: {type: 'varchar',example: "'1235456'",description: 'Agar yuridik shaxs bolsa STIR raqami kiriting(optional) (Raqam kiritishda'},
        email: {type: 'varchar',example: 'nodirbekshokirov@gmail.com'}
      },
      required: ['firstName','lastName','address','phoneNumber','email']
    }
  })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @ApiOperation({summary: 'Barcha mijozlar haqidagi  malumotlarni olish'})
  @ApiResponse({status: 200,description: 'Mijoz muvaffaqiyatli korildi'})
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Faqat bitta mijoz haqidagi malumotlarni olish'})
  @ApiResponse({status: 200,description: 'Mijoz muvaffaqiyatli korildi'})
  @ApiResponse({status: 404,description: 'Mijoz topilmadi'})
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth() 
  @Roles(UserRoles.ADMIN,UserRoles.OPERATOR)
  @UseGuards(CheckRoleGuard)
  @ApiOperation({summary: 'Mijozlar haqidagi malumotlarni tahrirlash'})
  @ApiResponse({status: 201,description: 'Mijoz muvaffaqiyatli ozgartirildi'})
  @ApiResponse({status: 400,description: 'Bad Request: Validation error!'})
  @ApiResponse({status: 404,description: 'Mijoz topilmadi'})

  @ApiBody({
    schema:{
      properties:{
        firstName: {type: 'varchar',example: 'Nodir'},
        lastName: {type: 'varchar',example: 'Shokirov'},
        address: {type: 'varchar',example: 'Namangan vil. Pop tum. Dostlik koch. 22-uy'},
        phoneNumber: {type: 'varchar',example: '+998959635252'},
        companyName: {type: 'varchar',example: 'Nodirbek Group LLC',description: 'Agar yuridik shaxs bolsa companiya nomi kiriting(optional)'},
        tin: {type: 'varchar',example: "'12356789'",description: 'Agar yuridik shaxs bolsa STIR raqami kiriting(optional)'},
        email: {type: 'varchar',example: 'nodirbekshokirov@gmail.com'}
      },
    }
  })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  @ApiBearerAuth() 
  @Roles(UserRoles.ADMIN)
  @UseGuards(CheckRoleGuard)
  @ApiOperation({summary: 'Faqat bitta mijoz haqidagi malumotlarni ochirish'})
  @ApiResponse({status: 200,description: 'Mijoz muvaffaqiyatli ochirildi'})
  @ApiResponse({status: 404,description: 'Mijoz topilmadi'})
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
