import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { Reflector }
  from '@nestjs/core';

import {
  PLATFORM_ROLES_KEY,
} from '../decorators/platform-roles.decorator';

@Injectable()
export class PlatformRoleGuard
  implements CanActivate {

  constructor(
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {

    const requiredRoles =
      this.reflector.getAllAndOverride<
        string[]
      >(
        PLATFORM_ROLES_KEY,
        [
          context.getHandler(),
          context.getClass(),
        ],
      );

    if (!requiredRoles) {
      return true;
    }

    const request =
      context
        .switchToHttp()
        .getRequest();

    const user =
      request.user;

    if (!user) {
      return false;
    }

   const hasRole =
  requiredRoles.some(
    role =>
      user.platform_roles?.includes(
        role,
      ),
  );
    if (!hasRole) {
      throw new ForbiddenException(
        'Insufficient permissions',
      );
    }

    return true;
  }
}