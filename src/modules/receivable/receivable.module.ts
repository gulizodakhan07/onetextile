import { Module } from '@nestjs/common';
import { ReceivableService } from './receivable.service';
import { ReceivableController } from './receivable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receivable } from './entities/receivable.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([Receivable])],
  controllers: [ReceivableController],
  providers: [ReceivableService,JwtService],
})
export class ReceivableModule {}
