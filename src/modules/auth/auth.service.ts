import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RedisService } from 'src/client/redis.service';
import { UserRoles } from 'src/utils/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwt: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async signUp(payload: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: payload.email },
    });

    if (existingUser) {
      throw new ConflictException('Bunday email mavjud');
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

  
    const newUser = this.userRepository.create({
      username: payload.username,
      email: payload.email,
      role: payload.role,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);

    return this.generateTokens(newUser);
  }

  async signIn(payload: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: { username: payload.username },
    });

    if (!user) {
      throw new NotFoundException('Foydalanuvchi topilmadi');
    }

    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Parol noto‘g‘ri');
    }

    return this.generateTokens(user);
  }

  private async generateTokens(user: User) {
    const payload = { id: user.id, role: user.role };

    const accessToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_TIME,
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_TIME,
    });

    await this.redisService.setValue(
      `refresh_token_user_${user.id}`,
      refreshToken,
      604800, // 7 kun
    );

    return {
      message: 'Success ✅',
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string) {
    try {
      console.log('Clientdan kelgan token:', token);

      const decoded = await this.jwt.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.userRepository.findOne({
        where: { id: decoded.id },
      });

      if (!user) {
        throw new NotFoundException('Foydalanuvchi topilmadi');
      }

      const storedToken = await this.redisService.getValue(
        `refresh_token_user_${user.id}`,
      );
      console.log('Redisdagi token:', storedToken);

      if (!storedToken || storedToken !== token) {
        throw new UnauthorizedException('Refresh token mos emas yoki muddati tugagan');
      }

      const newAccessToken = await this.jwt.signAsync(
        { id: user.id, role: user.role },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: process.env.JWT_ACCESS_TIME,
        },
      );

      const newRefreshToken = await this.jwt.signAsync(
        { id: user.id, role: user.role },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: process.env.JWT_REFRESH_TIME,
        },
      );

      await this.redisService.setValue(
        `refresh_token_user_${user.id}`,
        newRefreshToken,
        604800, // 7 kun
      );

      return {
        message: 'Tokenlar yangilandi ✅',
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Refresh token noto‘g‘ri yoki muddati tugagan');
    }
  }

  async logout(token: string) {
    try {
      // Tokenni dekodlash orqali userni olish
      const decoded = await this.jwt.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
  
      // Userni olish
      const user = await this.userRepository.findOne({
        where: { id: decoded.id },
      });
  
      if (!user) {
        throw new NotFoundException('Foydalanuvchi topilmadi');
      }
  
      // Redisdan saqlangan tokenni tekshirish
      const storedToken = await this.redisService.getValue(
        `refresh_token_user_${user.id}`,
      );
  
      if (!storedToken || storedToken !== token) {
        throw new UnauthorizedException('Token noto‘g‘ri yoki muddati tugagan');
      }
  
      // Redisdan tokenni o‘chirish
      await this.redisService.deleteValue(`refresh_token_user_${user.id}`);
  
      return { message: 'Foydalanuvchi muvaffaqiyatli logout qilindi' };
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Xatolik yuz berdi');
    }
  }
  
}
