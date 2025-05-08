import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from './entities/currency.entity';
import { ExchangeRate } from '../exchange-rate/entities/exchange-rate.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([Currency,ExchangeRate])],
  controllers: [CurrencyController],
  providers: [CurrencyService,JwtService],
})
export class CurrencyModule {}
