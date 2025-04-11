import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Invoice } from '../invoice/entities/invoice.entity';
import { InvoiceModule } from '../invoice/invoice.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client,Invoice]),InvoiceModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
