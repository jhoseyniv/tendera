import {
  Module
} from '@nestjs/common';

import {
  JwtModule
} from '@nestjs/jwt';

import {
  MeController
} from './me.controller';

import {
  MeService
} from './me.service';

import {
  PrismaService
} from '../../prisma/prisma.service';

import {
  JwtAuthGuard
} from '../auth/jwt-auth.guard';

@Module({

  imports: [

    JwtModule.register({

      secret: process.env.JWT_SECRET
    })
  ],

  controllers: [
    MeController
  ],

  providers: [

    MeService,

    PrismaService,

    JwtAuthGuard
  ]
})

export class MeModule {}