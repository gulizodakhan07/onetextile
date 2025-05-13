import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterial } from 'src/modules/raw-material/entities/raw-material.entity';
import { DyedYarn } from 'src/modules/dyed-yarn/entities/dyed-yarn.entity';
import { Receivable } from 'src/modules/receivable/entities/receivable.entity';
import { Payment } from 'src/modules/payment/entities/payment.entity';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([RawMaterial, DyedYarn, Receivable, Payment]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService],  
})
export class InventoryModule {}
