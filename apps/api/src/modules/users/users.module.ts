import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from '../../auth/auth.module';

import { UsersController } from './users.controller';

import { UsersService } from './users.service';

import { PrismaService } from '../../../prisma/prisma.service';

@Module({

  imports: [

    AuthModule,

    JwtModule.register({}),
  ],

  controllers: [

    UsersController,
  ],

  providers: [

    UsersService,

    PrismaService,
  ],

  exports: [

    UsersService,
  ],
})
export class UsersModule {}