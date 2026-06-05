import { ExecutionsModule } from './executions/executions.module';

import {

  Module,

  NestModule,

  MiddlewareConsumer

} from '@nestjs/common';

import {

  AuthModule

} from './auth/auth.module';

import {

  MeModule

} from './me/me.module';

import {

  WorkspacesModule

} from './workspaces/workspaces.module';

import {

  WorkspaceMiddleware

} from './common/middleware/workspace.middleware';

import { AuditModule }
from './audit/audit.module';

import {

  PromptsModule

} from './prompts/prompts.module';

import {

  AIModule

} from './ai/ai.module';

import {

  ModelsModule

} from './model/models.module';

import { TenantsModule } from './tenants/tenants.module';

@Module({

  imports: [
    AuthModule,
    MeModule,
    WorkspacesModule,
     AuditModule,
     PromptsModule,
    AIModule ,
    ExecutionsModule,
    ModelsModule ,
    TenantsModule,

  ],
})

export class AppModule
  implements NestModule {

  configure(

    consumer: MiddlewareConsumer

  ) {

    consumer

      .apply(

        WorkspaceMiddleware
      )

      .forRoutes('*');
  }
}
