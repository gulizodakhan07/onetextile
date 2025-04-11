import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotAcceptableException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { Request } from 'express';
import { UserRoles } from 'src/utils/user-role.enum';
  
  @Injectable()
  export class CheckRoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest<Request>();
      const user = (request as any).user;
  
      const requiredRoles = this.reflector.get<UserRoles[]>(
        'roles',
        context.getHandler(),
      );
  
      if (!requiredRoles || requiredRoles.length === 0) {
        // Role talab qilinmagan — hamma kirishi mumkin
        return true;
      }
  
      if (!user || !requiredRoles.includes(user.role)) {
        throw new NotAcceptableException(
          'Bu endpointga kirish huquqingiz yo‘q',
        );
      }
  
      return true;
    }
  }
  