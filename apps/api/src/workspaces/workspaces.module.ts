import {

  Module

} from '@nestjs/common';

import {

  WorkspacesController

} from './workspaces.controller';

import {

  WorkspacesService

} from './workspaces.service';

import {

  PrismaService

} from '../../prisma/prisma.service';

import {

  AuthModule

} from '../auth/auth.module';

import { WorkspaceAccessGuard }
from './workspace-access.guard';

@Module({

  imports: [

    AuthModule
  ],

  controllers: [

    WorkspacesController
  ],

  providers: [

    WorkspacesService,
    PrismaService,
    WorkspaceAccessGuard,
  ]
})

export class WorkspacesModule {}

