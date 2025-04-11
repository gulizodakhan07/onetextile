import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  interface JwtPayload {
    id: number;
    role: string;
  }
  
  @Injectable()
  export class CheckAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const authHeader = request.headers['authorization'];
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Token yuborilmagan yoki noto‘g‘ri formatda');
      }
  
      const token = authHeader.split(' ')[1];
  
      try {
        const decoded = await this.jwtService.verifyAsync<JwtPayload>(token, {
          secret: process.env.JWT_ACCESS_SECRET,
        });
  
        (request as any).user = {
          id: decoded.id,
          role: decoded.role,
        };
  
        return true;
      } catch (err) {
        throw new UnauthorizedException('Token yaroqsiz yoki muddati tugagan');
      }
    }
  }
  