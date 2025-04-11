import { Module } from '@nestjs/common';
import { InvoiceItemService } from './invoice-item.service';
import { InvoiceItemController } from './invoice-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceItem } from './entities/invoice-item.entity';
import { DyedYarn } from '../dyed-yarn/entities/dyed-yarn.entity';
import { Invoice } from '../invoice/entities/invoice.entity';

@Module({
  imports:[TypeOrmModule.forFeature([InvoiceItem,DyedYarn,Invoice])],
  controllers: [InvoiceItemController],
  providers: [InvoiceItemService],
})
export class InvoiceItemModule {}
