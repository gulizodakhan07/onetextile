import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Invoice } from './entities/invoice.entity';
import { CheckRoleGuard } from 'src/guard/check-role.guard';
import { UserRoles } from 'src/utils/user-role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { CheckAuthGuard } from 'src/guard/check-auth.guard';

@ApiTags("Invoice(Faktura)")
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @UseGuards(CheckAuthGuard,CheckRoleGuard)
  @ApiBearerAuth() 
  @Roles(UserRoles.ADMIN,UserRoles.OPERATOR)
  @ApiOperation({summary: "Yangi invoice(faktura) yaratish"})
  @ApiResponse({ status: 201, description: 'Invoice muvaffaqiyatli yaratildi.' })
  @ApiResponse({ status: 400, description: 'Xatolik: noto\'g\'ri ma\'lumot' })
  @ApiBody({
    schema: {
      properties:{
        invoiceDate:{type: "date",example: "2025-04-02"},
        clientId:{type: "int",example: 2},
        invoiceItemsId: {type: "array",items: {type:"int"}, example: [1]},
        discount: {type: "int",example: 5},
        discountType: {type: "enum",enum:['amount', 'percent'],example: 'amount'},
        paidAmount: {type: "int",example: 200}
      }
    }
  })
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  @Roles(UserRoles.ADMIN,UserRoles.OBSERVER,UserRoles.OPERATOR)
  @UseGuards(CheckAuthGuard,CheckRoleGuard)
  @ApiOperation({summary: "Yangi invoice(faktura) olish"})
  @ApiResponse({ status: 200, description: 'Invoice muvaffaqiyatli korildi.' })
  @ApiResponse({ status: 404, description: 'Invoice topilmadi.' })
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @Roles(UserRoles.ADMIN,UserRoles.OBSERVER,UserRoles.OPERATOR)
  @UseGuards(CheckAuthGuard,CheckRoleGuard)
  @ApiOperation({summary: "Yangi invoice(faktura) oish"})
  @ApiResponse({ status: 200, description: 'Invoice muvaffaqiyatli korildi.',type: Invoice })
  @ApiResponse({ status: 404, description: 'Invoice topilmadi.' })
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(CheckAuthGuard,CheckRoleGuard)
  @ApiBearerAuth() 
  @Roles(UserRoles.ADMIN,UserRoles.OPERATOR)
  @ApiOperation({summary: "Yangi invoice(faktura) tahrirlash"})
  @ApiResponse({ status: 201, description: 'Invoice muvaffaqiyatli ozgartirildi.' })
  @ApiResponse({ status: 400, description: 'Bad request: Vaalidation error' })
  @ApiResponse({ status: 404, description: 'Faktura topilmadi' })
  @ApiBody({
    schema: {
      properties:{
        invoiceDate:{type: "date",example: "2025-04-02"},
        clientId:{type: "int",example: 2},
        invoiceItemsId: {type: "array",items: {type:"int"}, example: [1]},
        discount: {type: "int",example: 5},
        discountType: {type: "enum",enum:['amount', 'percent'],example: 'percent'},
        paidAmount: {type: "int",example: 2000}
      }
    }
  })
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  @UseGuards(CheckAuthGuard,CheckRoleGuard)
  @ApiBearerAuth() 
  @Roles(UserRoles.ADMIN)
  @ApiOperation({summary: "Yangi invoice(faktura) ochirish"})
  @ApiResponse({ status: 200, description: 'Invoice muvaffaqiyatli ochirildi.' })
  @ApiResponse({ status: 404, description: 'Invoice topilmadi.' })
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(+id);
  }
}
