import { Module } from '@nestjs/common';

import { JwtModule }
from '@nestjs/jwt';

import { AuthModule }
from '../../auth/auth.module';

import { PermissionsController }
from './permissions.controller';

import { PermissionsService }
from './permissions.service';

import { PrismaService }
from '../../../prisma/prisma.service';

@Module({

  imports: [

    AuthModule,

    JwtModule.register({}),
  ],

  controllers: [

    PermissionsController,
  ],

  providers: [

    PermissionsService,

    PrismaService,
  ],

  exports: [

    PermissionsService,
  ],
})
export class PermissionsModule {}