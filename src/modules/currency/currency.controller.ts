import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Currency, CurrencyType } from './entities/currency.entity';
import { ExchangeRate } from '../exchange-rate/entities/exchange-rate.entity';
import { UserRoles } from 'src/utils/user-role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { CheckRoleGuard } from 'src/guard/check-role.guard';
import { CheckAuthGuard } from 'src/guard/check-auth.guard';

@ApiTags('Currency') 
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) { }

  @Post()
  @ApiBearerAuth()
  @Roles(UserRoles.ADMIN,UserRoles.OPERATOR)
  @UseGuards(CheckAuthGuard,CheckRoleGuard)
  @ApiOperation({ summary: 'Create a new currency entry' })
  @ApiBody({
    schema: {
      properties: {
        code: { type: "enum", enum: [CurrencyType], example: CurrencyType.UZS },
        currentRate: { type: "int", example: 1 }
      }
    }
  }) 
  @ApiResponse({ status: 201, description: 'Currency successfully created' })
  @ApiResponse({ status: 400, description: 'Bad Request:Validation error' })
  async create(@Body() createDto: CreateCurrencyDto): Promise<Currency> {
    return this.currencyService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all currencies' })
  @ApiResponse({ status: 200, description: 'All currencies fetched successfully' })
  async findAll(): Promise<Currency[]> {
    return this.currencyService.findAll();
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles(UserRoles.ADMIN,UserRoles.OPERATOR)
  @UseGuards(CheckAuthGuard,CheckRoleGuard)
  @ApiOperation({ summary: 'Update currency rate by code' })
  @ApiResponse({ status: 200, description: 'Currency updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request:Validation error' })
  @ApiBody({
    schema: {
      properties: {
        code: { type: "enum", enum: [CurrencyType], example: CurrencyType.UZS },
        currentRate: { type: "int", example: 1 }
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Currency not found' })
  async update(@Param('id')id: number, @Body() updateDto: CreateCurrencyDto): Promise<Currency> {
    return this.currencyService.update(id,updateDto);
  }

  @Get(':code/history')
  @ApiOperation({ summary: 'Get currency exchange rate history by code' })
  @ApiResponse({
    status: 200,
    description: 'Exchange rate history fetched successfully',
  })
  async findHistory(@Param('code') code: string): Promise<ExchangeRate[]> {
    return this.currencyService.findHistory(code);
  }
}
