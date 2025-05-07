import { Module } from '@nestjs/common';
import { DyHouseService } from './dy-house.service';
import { DyHouseController } from './dy-house.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DyHouse } from './entities/dy-house.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([DyHouse,])],
  controllers: [DyHouseController],
  providers: [DyHouseService,JwtService],
})
export class DyHouseModule {}
