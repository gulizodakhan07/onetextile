import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UserRoles } from 'src/utils/user-role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get()
  @ApiOperation({ summary: 'Barcha userlar ro‘yxati' })
  @ApiResponse({ status: 200, description: 'userlar ro‘yxati muvaffaqiyatli korildi' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha user olish' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'user muvaffaqiyatli topildi' })
  @ApiResponse({ status: 404, description: 'user topilmadi' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Foydalanuvchini malumotlarini tahrirlash' })
  @ApiResponse({status:404,description: 'User topilmadi'})
  @ApiResponse({ status: 400,description: 'Bad Request: Noto‘g‘ri ma’lumotlar kiritildi'})
  @ApiResponse({ status: 200,description: 'User malumotlari muvaffaqiyatli ozgartirildi'})
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'johndoe@example.com' },
        username: { type: 'string', example: 'johndoe' },
        password: { type: 'string', example: 'MyStrongP@ssword' },
        role: { type: 'string', enum: [UserRoles], example: UserRoles.OPERATOR },
      },
    },
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Userni o\'chirish' })
  @ApiResponse({ status: 400,description: 'Bad Request: Noto\'g\'ri ma\'lumotlar kiritildi'})
  @ApiResponse({ status: 200,description: 'User malumotlari muvaffaqiyatli ozgartirildi'})
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
