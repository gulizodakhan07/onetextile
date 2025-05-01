import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentMethodStatus } from 'src/utils/paymentMethod.enum';
import { UserRoles } from 'src/utils/user-role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { CheckRoleGuard } from 'src/guard/check-role.guard';
import { CheckAuthGuard } from 'src/guard/check-auth.guard';

@ApiTags("Payment")
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post()
  @UseGuards(CheckAuthGuard,CheckRoleGuard)
  @ApiBearerAuth() 
  @Roles(UserRoles.ADMIN,UserRoles.OPERATOR)
  @ApiOperation({ summary: 'Mijozlardan qilingan to\'lovlar haqidagi ma\'lumotlarni yaratish' })
  @ApiResponse({ status: 201, description: 'Tolovlar muvaffaqiyatli yaratildi' })
  @ApiResponse({ status: 400, description: 'Bad request: Validation error' })
  @ApiBody({
    schema: {
      properties: {
        paymentDate: { type: 'date', example: '2025-04-06' },
        amount: { type: 'decimal', example: '123456.45' },
        paymentMethod: { type: 'enum', enum: [PaymentMethodStatus], example: PaymentMethodStatus.CLICK },
        transactionId: { type: 'varchar', example: 'TR123456789' },
        notes: { type: 'varchar', example: 'Tolov click orqali amalga oshirildi' }
      },
      required: ['paymentDate', 'amount', 'paymentMethod', 'notes']
    }
  })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Mijozlardan qilingan to\'lovlar haqidagi ma\'lumotlarni olish' })
  @ApiResponse({ status: 200, description: 'Tolovlar muvaffaqiyatli korildi' })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mijozlardan qilingan to\'lov haqidagi ma\'lumotlarni olish' })
  @ApiResponse({ status: 200, description: 'Tolov muvaffaqiyatli korildi' })
  @ApiResponse({ status: 404, description: 'Tolov toplimadi' })
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(CheckAuthGuard,CheckRoleGuard)
  @ApiBearerAuth() 
  @Roles(UserRoles.ADMIN,UserRoles.OPERATOR)
  @ApiOperation({ summary: 'Mijozlardan qilingan to\'lovlar haqidagi ma\'lumotlarni tahrirlash' })
  @ApiResponse({ status: 200, description: 'Tolovlar muvaffaqiyatli ozgartirildi' })
  @ApiResponse({ status: 400, description: 'Bad request: Validation error' })
  @ApiResponse({ status: 404, description: 'Tolov topilmadi' })
  @ApiBody({
    schema: {
      properties: {
        paymentDate: { type: 'date', example: '2025-04-06' },
        amount: { type: 'decimal', example: '123456.45' },
        paymentMethod: { type: 'enum', enum: [PaymentMethodStatus], example: PaymentMethodStatus.NAQD },
        transactionId: { type: 'varchar', example: 'RT123456789' },
        notes: { type: 'varchar', example: 'Tolov naqd pul orqali amalga oshirildi' }
      },
    }
  })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  @UseGuards(CheckAuthGuard,CheckRoleGuard)
  @ApiBearerAuth() 
  @Roles(UserRoles.ADMIN)
  @ApiOperation({ summary: 'Mijozlardan qilingan to\'lov haqidagi ma\'lumotlarni ochirish' })
  @ApiResponse({ status: 200, description: 'Tolov muvaffaqiyatli ochirildi' })
  @ApiResponse({ status: 404, description: 'Tolov topilmadi' })
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
