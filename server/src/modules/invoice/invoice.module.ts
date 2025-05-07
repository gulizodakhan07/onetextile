import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from '../invoice-item/entities/invoice-item.entity';
import { InvoiceItemModule } from '../invoice-item/invoice-item.module';
import { Client } from '../client/entities/client.entity';
import { InvoiceItemService } from '../invoice-item/invoice-item.service';
import { DyedYarn } from '../dyed-yarn/entities/dyed-yarn.entity';
import { TelegramModule } from '../telegram-bot/telegram-bot.module';
import { TelegramBotService } from '../telegram-bot/telegram-bot.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice,InvoiceItem,Client,DyedYarn]),InvoiceItemModule,TelegramModule],
  controllers: [InvoiceController],
  providers: [InvoiceService,InvoiceItemService,TelegramBotService,JwtService],
})
export class InvoiceModule {}
