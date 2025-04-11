import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReceivableService } from './receivable.service';
import { CreateReceivableDto } from './dto/create-receivable.dto';
import { UpdateReceivableDto } from './dto/update-receivable.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentStatus } from '../invoice/entities/invoice.entity';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRoles } from 'src/utils/user-role.enum';
import { CheckRoleGuard } from 'src/guard/check-role.guard';

@ApiTags('Receivable')
@Controller('receivable')
export class ReceivableController {
  constructor(private readonly receivableService: ReceivableService) {}

  @Post()
  
  @Roles(UserRoles.ADMIN,UserRoles.OPERATOR)
  @UseGuards(CheckRoleGuard)
  @ApiOperation({summary: 'Firma kimlardan qarzi borligi haqidagi malumotlarni yaratish'})
  @ApiResponse({status:201,description:'success'})
  @ApiResponse({status:400,description:"Bad request: Validation error"})
  @ApiBody({
    schema:{
      properties:{
        supplier: {type: 'varchar', example: 'Olam Textile', description: 'Kimdan qarz olingan' },
        description: {type: 'text', example: 'Xom ashyo uchun qarz', description: 'Qarzdorlik sababi' },
        amount: {type:'decimal', example: 5000000, description: 'Qarzdorlik summasi' },
        dueDate: {type:'date', example: '2025-05-10', description: 'To\'lash muddati' },
        paymentDate: {type: 'date', example: '2025-05-05',  description: 'To\'lov sanasi (agar to\'langan bo\'lsa)' },
        paymentStatus:{type:'enum', enum: [PaymentStatus], example: PaymentStatus.UNPAID, description: 'To‘lov holati' }
      }
    }
  })
  create(@Body() dto: CreateReceivableDto) {
    return this.receivableService.create(dto);
  }

  @Get()
  @ApiOperation({summary: 'Firma kimlardan qarzi borligi haqidagi malumotlarni korish'})
  @ApiResponse({status:200,description:'success'})
  findAll() {
    return this.receivableService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Firma kimdan qarzi borligi haqidagi malumotlarni korish'})
  @ApiResponse({status:404,description:"Not Found"})
  @ApiResponse({status:200,description:'success'})
  findOne(@Param('id') id: string) {
    return this.receivableService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRoles.ADMIN,UserRoles.OPERATOR)
  @UseGuards(CheckRoleGuard)
  @ApiOperation({summary: 'Firma kimlardan qarzi borligi haqidagi malumotlarni tahrirlash'})
  @ApiResponse({status:200,description:'muvaffaqiyatli ozgartirildi'})
  @ApiResponse({status:400,description:"Bad request: Validation error"})
  @ApiResponse({status:404,description:"Not Found"})
  @ApiBody({
    schema:{
      properties:{
        supplier: {type: 'varchar', example: 'Olam Textile', description: 'Kimdan qarz olingan' },
        description: {type: 'text', example: 'Xom ashyo uchun qarz', description: 'Qarzdorlik sababi' },
        amount: {type:'decimal', example: 5000000, description: 'Qarzdorlik summasi' },
        dueDate: {type:'date', example: '2025-05-10', description: 'To\'lash muddati' },
        paymentDate: {type: 'date', example: '2025-05-05',  description: 'To\'lov sanasi (agar to\'langan bo\'lsa)' },
        paymentStatus:{type:'enum', enum: [PaymentStatus], example: PaymentStatus.UNPAID, description: 'To‘lov holati' }
      }
    }
  })
  update(@Param('id') id: string, @Body() dto: UpdateReceivableDto) {
    return this.receivableService.update(+id, dto);
  }

  @Delete(':id')
  
  @Roles(UserRoles.ADMIN,UserRoles.OPERATOR)
  @UseGuards(CheckRoleGuard)
  @ApiOperation({summary: 'Firma kimlardan qarzi borligi haqidagi malumotlarni ochirish'})
  @ApiResponse({status:200,description:'muvaffaqiyatli ochirildi'})
  @ApiResponse({status:404,description:"Not Found"})
  remove(@Param('id') id: string) {
    return this.receivableService.remove(+id);
  }
}
