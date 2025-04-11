import { Module } from '@nestjs/common';
import { DyHouseService } from './dy-house.service';
import { DyHouseController } from './dy-house.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DyHouse } from './entities/dy-house.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DyHouse,])],
  controllers: [DyHouseController],
  providers: [DyHouseService],
})
export class DyHouseModule {}
