
import {

  Module

} from '@nestjs/common';

import {

  JwtModule

} from '@nestjs/jwt';

import {

  AuthController

} from './auth.controller';

import {

  AuthService

} from './auth.service';

import {

  PrismaService

} from '../../prisma/prisma.service';

import { AuditModule }
from '../audit/audit.module';

@Module({

  imports: [

    JwtModule.register({

      secret:
        process.env.JWT_SECRET,

      signOptions: {

        expiresIn: '1d'
      }
    }),
    AuditModule
  ],

  controllers: [

    AuthController
  ],

  providers: [

    AuthService,

    PrismaService
  ],

  exports: [

    JwtModule,

    AuthService
  ]
})

export class AuthModule {}
