// src/modules/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException, Headers, BadRequestException, Query, UseGuards } from '@nestjs/common';
import { Request } from "express"
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRoles } from 'src/utils/user-role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { CheckRoleGuard } from 'src/guard/check-role.guard';

@ApiTags('auth')
@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('signup')
  @ApiOperation({ summary: 'Foydalanuvchini ro‘yxatdan o‘tkazish' })
  @ApiBody({
    description: 'Ro‘yxatdan o‘tish uchun foydalanuvchi ma\'lumotlari',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'nodir@gmail.com' },
        username: { type: 'string', example: 'nodir' },
        password: { type: 'string', example: 'nodir1' },
        role: { type: 'string', enum: [UserRoles], example: UserRoles.OPERATOR },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Tokenlar yangilandi ✅',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Success ✅' },
        accessToken: {
          type: 'string',
          // example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ0MDk1MDM2LCJleHAiOjE3NDQwOTg2MzZ9.abK-NniAnUbRKbGpfWfwjozVE3TBHZq1CzyiRwk_Fws' 
        },
        refreshToken: {
          type: 'string',
          // example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ0MDk1MDM2LCJleHAiOjE3NDQ2OTk4MzZ9.IwKX0vSLivUt3oUIAd3DEhBUepskfj7nIkfKQ545fiI' 
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Noto‘g‘ri ma’lumotlar kiritildi',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict: Foydalanuvchi allaqachon mavjud',
  })
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Foydalanuvchini tizimga kirishi' })
  @ApiBody({
    description: 'Tizimga kirish uchun foydalanuvchi ma\'lumotlari',
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string', example: 'johndoe' },
        password: { type: 'string', example: 'MyStrongP@ssword' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchi muvaffaqiyatli tizimga kirdi',
    schema: {
      example: {
        message: 'Success✅',
        accessToken: 'access_token_here',
        refreshToken: 'refresh_token_here',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Noto‘g‘ri foydalanuvchi ma’lumotlari',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Noto‘g‘ri yoki yo‘q parol',
  })
  async signIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signIn(loginUserDto);
  }

  @Post('refresh-token')
@ApiOperation({ summary: 'Refresh access token (enter only refresh token)' })
@ApiResponse({
  status: 200,
  description: 'Successfully refreshed',
})
@ApiResponse({
  status: 401,
  description: 'Unauthorized token or invalid',
})
@ApiQuery({
  name: 'token',
  description: 'Refresh access token',
  required: true,
  type: String,
})
async refresh(@Query('token') token: string) {
  console.log('Refreshed token:', token);
  
  if (!token) {
    throw new UnauthorizedException('Refresh token is missing in query parameter');
  }

  return this.authService.refreshToken(token);
}


  @Post('logout')
  @ApiOperation({ summary: 'Foydalanuvchini tizimdan chiqazish (Logout)' })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchi muvaffaqiyatli chiqdi',
  })
  @ApiResponse({
    status: 401,
    description: 'Token noto‘g‘ri yoki yo‘q',
  })
  @ApiQuery({
    name: 'token',
    description: 'Foydalanuvchi refresh tokeni',
    required: true,
    type: String,
  })
  async logout(@Query('token') token: string) {
    if (!token) {
      throw new UnauthorizedException('Token is missing in query parameter');
    }
  
    // Tokenni tekshirib, logout qiling
    return this.authService.logout(token);
  }
}
