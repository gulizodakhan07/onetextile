import { Module } from '@nestjs/common';
import { SenttodyehouseService } from './senttodyehouse.service';
import { SenttodyehouseController } from './senttodyehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Senttodyehouse } from './entities/senttodyehouse.entity';
import { RawMaterial } from '../raw-material/entities/raw-material.entity';
import { DyHouse } from '../dy-house/entities/dy-house.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([Senttodyehouse,RawMaterial,DyHouse])],
  controllers: [SenttodyehouseController],
  providers: [SenttodyehouseService,JwtService],
})
export class SenttodyehouseModule {}
