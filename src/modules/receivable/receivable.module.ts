import { Module } from '@nestjs/common';
import { ReceivableService } from './receivable.service';
import { ReceivableController } from './receivable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receivable } from './entities/receivable.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Receivable])],
  controllers: [ReceivableController],
  providers: [ReceivableService],
})
export class ReceivableModule {}
