import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_METADATA_KEY, UserRoles } from 'src/enums/user-roles.enum';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(ROLES_METADATA_KEY,[
      context.getHandler(),
      context.getClass()
    ]);

    const { user } = context.switchToHttp().getRequest();

    if (!requiredRoles) {
      return true; // Si no se requieren roles específicos, permitir acceso
    }

    return requiredRoles.some((role) => user.role?.includes(role))
  }
}