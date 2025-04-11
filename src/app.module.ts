import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { RedisModule } from './client/redis.module';
import { RawMaterialModule } from './modules/raw-material/raw-material.module';
import { RawMaterial } from './modules/raw-material/entities/raw-material.entity';
import { DyHouseModule } from './modules/dy-house/dy-house.module';
import { DyHouse } from './modules/dy-house/entities/dy-house.entity';
import { Senttodyehouse } from './modules/senttodyehouse/entities/senttodyehouse.entity';
import { SenttodyehouseModule } from './modules/senttodyehouse/senttodyehouse.module';
import { DyedYarnModule } from './modules/dyed-yarn/dyed-yarn.module';
import { DyedYarn } from './modules/dyed-yarn/entities/dyed-yarn.entity';
import { ClientModule } from './modules/client/client.module';
import { Client } from './modules/client/entities/client.entity';
import { Payment } from './modules/payment/entities/payment.entity';
import { PaymentModule } from './modules/payment/payment.module';
import { UserModule } from './modules/user/user.module';
import { InvoiceItemModule } from './modules/invoice-item/invoice-item.module';
import { Invoice } from './modules/invoice/entities/invoice.entity';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { InvoiceItem } from './modules/invoice-item/entities/invoice-item.entity';
import { ExchangeRateModule } from './modules/exchange-rate/exchange-rate.module';
import { Currency } from './modules/currency/entities/currency.entity';
import { ExchangeRate } from './modules/exchange-rate/entities/exchange-rate.entity';
import { CurrencyModule } from './modules/currency/currency.module';
import { TelegramModule } from './modules/telegram-bot/telegram-bot.module';
import { ReceivableModule } from './modules/receivable/receivable.module';
import { Receivable } from './modules/receivable/entities/receivable.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      entities: [User,RawMaterial,DyHouse,Senttodyehouse,DyedYarn,Client,Payment,Invoice,InvoiceItem,Currency,ExchangeRate,Receivable],
      synchronize: true,
      // logging: true
    }),
    AuthModule,
    RedisModule,
    RawMaterialModule,
    DyHouseModule,
    SenttodyehouseModule,
    DyedYarnModule,
    ClientModule,
    PaymentModule,
    UserModule,
    InvoiceItemModule,
    InvoiceModule,
    ExchangeRateModule,
    CurrencyModule,
    TelegramModule,
    ReceivableModule
    

    ],
  providers: [],
})
export class AppModule { }
