import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceItemService } from './invoice-item.service';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Invoice Items')
@Controller('invoice-item')
export class InvoiceItemController {
  constructor(private readonly invoiceItemService: InvoiceItemService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new invoice item' })
  @ApiBody({
    description: 'Data required to create a new invoice item',
    type: CreateInvoiceItemDto,
    examples: {
      example1: {
        summary: 'Example InvoiceItem',
        value: {
          dyedYarnId: 1,
          invoiceId: 1,
          quantity: 100,
          unitPrice: 25.5
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Invoice item successfully created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createInvoiceItemDto: CreateInvoiceItemDto) {
    return this.invoiceItemService.create(createInvoiceItemDto);
  }

  @Get()
  findAll() {
    return this.invoiceItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceItemDto: UpdateInvoiceItemDto) {
    return this.invoiceItemService.update(+id, updateInvoiceItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceItemService.remove(+id);
  }
}
