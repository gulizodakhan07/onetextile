import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtCustomModule } from './jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { AuthController } from './auth.controller';
import { RedisModule } from 'src/client/redis.module';
import { RedisService } from 'src/client/redis.service';
// import { AuthController } from './auth.controller';

@Module({
  
  imports:[TypeOrmModule.forFeature([User]),JwtCustomModule,RedisModule],
  controllers: [AuthController],
  providers: [AuthService,RedisService]
})
export class AuthModule {}
