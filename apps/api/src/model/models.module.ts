import {

  Module

} from '@nestjs/common';

import {

  PrismaService

} from '../../prisma/prisma.service';

import {

  AuthModule

} from '../auth/auth.module';

import {

  ModelsController

} from './models.controller';

import {

  ModelsService

} from './models.service';

@Module({

  imports: [

    AuthModule
  ],

  controllers: [

    ModelsController
  ],

  providers: [

    PrismaService,

    ModelsService
  ],

  exports: [

    ModelsService
  ]
})

export class ModelsModule {}