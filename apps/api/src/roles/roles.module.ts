import {
  Module
} from '@nestjs/common';

import {
  JwtModule
} from '@nestjs/jwt';

import {
  AuthModule
} from '../auth/auth.module';

import {
  RolesController
} from './roles.controller';

import {
  RolesService
} from './roles.service';

import {
  PrismaService
} from '../../prisma/prisma.service';

@Module({

  imports: [

    AuthModule,

    JwtModule.register({})
  ],

  controllers: [

    RolesController
  ],

  providers: [

    RolesService,

    PrismaService
  ],

  exports: [

    RolesService
  ]
})
export class RolesModule {}