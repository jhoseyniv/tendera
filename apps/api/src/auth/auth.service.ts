import {
  Injectable,
  UnauthorizedException
} from '@nestjs/common';

import {
  PrismaService
} from '../../prisma/prisma.service';

import * as bcrypt from 'bcrypt';

import {
  JwtService
} from '@nestjs/jwt';

import { AuditLogService }
from '../audit/audit-log.service';

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private auditLogService: AuditLogService
  ) {}

  async login(
    email: string,
    password: string
  ) {

    const user =
      await this.prisma.user.findFirst({
        where: {
          email
        }
      });

    if (
      !user ||
      !user.passwordHash
    ) {
      throw new UnauthorizedException(
        'Invalid credentials'
      );
    }

    const valid =
      await bcrypt.compare(
        password,
        user.passwordHash
      );

    if (!valid) {
      throw new UnauthorizedException(
        'Invalid credentials'
      );
    }

    const workspaceMember =
      await this.prisma
        .workspace_members
        .findFirst({
          where: {
            user_id:
              user.id
          }
        });

    //
    // Tenant Roles
    //
    const tenantUserRoles =
      await this.prisma.userRole.findMany({
        where: {
          user_id: user.id
        },
        include: {
          role: true
        }
      });

    const tenantRoles =
      tenantUserRoles.map(
        ur => ur.role.code
      );

    //
    // Platform Roles
    //
    const platformUserRoles =
      await this.prisma.platformUserRole.findMany({
        where: {
          user_id: user.id
        },
        include: {
          platformRole: true
        }
      });

    const platformRoles =
      platformUserRoles.map(
        pr => pr.platformRole.code
      );

    const access_token =
      this.jwtService.sign({

        sub:
          user.id,

        email:
          user.email,

        tenant_id:
          user.tenant_id,

        workspace_id:
          workspaceMember?.workspace_id,

        platform_roles:
          platformRoles,

        tenant_roles:
          tenantRoles
      });

    await this.auditLogService.log({

      tenantId:
        user.tenant_id,

      userId:
        user.id,

      action:
        'LOGIN',

      resourceType:
        'auth',

      metadata: {
        email:
          user.email
      }
    });

    return {

      access_token,

      user: {

        id:
          user.id,

        email:
          user.email,

        firstName:
          user.firstName,

        lastName:
          user.lastName,

        platformRoles:
          platformRoles,

        tenantRoles:
          tenantRoles
      }
    };
  }
}