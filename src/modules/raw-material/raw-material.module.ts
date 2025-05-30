import { Module } from '@nestjs/common';
import { RawMaterialService } from './raw-material.service';
import { RawMaterialController } from './raw-material.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterial } from './entities/raw-material.entity';
import { Senttodyehouse } from '../senttodyehouse/entities/senttodyehouse.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([RawMaterial,Senttodyehouse])],
  controllers: [RawMaterialController],
  providers: [RawMaterialService,JwtService],
})
export class RawMaterialModule {}
