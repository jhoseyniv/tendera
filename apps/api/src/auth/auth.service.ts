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
    private auditLogService:  AuditLogService

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


const access_token =
  this.jwtService.sign({

    sub:
      user.id,

    email:
      user.email,

    tenant_id:
      user.tenant_id,

    workspace_id: workspaceMember ?.workspace_id
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

        id: user.id,

        email: user.email,

        firstName:
          user.firstName,

        lastName:
          user.lastName
      }
    };
  }
}
