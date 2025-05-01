import { Module } from '@nestjs/common';
import { DyedYarnService } from './dyed-yarn.service';
import { DyedYarnController } from './dyed-yarn.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DyedYarn } from './entities/dyed-yarn.entity';
import { RawMaterial } from '../raw-material/entities/raw-material.entity';
import { DyHouse } from '../dy-house/entities/dy-house.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([DyedYarn,RawMaterial,DyHouse])],
  controllers: [DyedYarnController],
  providers: [DyedYarnService,JwtService],
})
export class DyedYarnModule {}
