import { Module } from '@nestjs/common';

import { PromptsService } from './prompts.service';
import { PromptsController } from './prompts.controller';
import { PromptRuntimeService } from './prompt-runtime.service';

import { PromptTemplateRenderer } from './prompt-template-renderer';
import { VariableValidator } from './variable-validator';

import { PrismaService } from '../../prisma/prisma.service';
import { AuditLogService } from '../audit/audit-log.service';

import { AuthModule } from '../auth/auth.module';
import { AIModule } from '../ai/ai.module';

@Module({
  imports: [
    AuthModule,
    AIModule,
  ],

  controllers: [
    PromptsController,
  ],

  providers: [
    PromptsService,
    PromptRuntimeService,

    PromptTemplateRenderer,
    VariableValidator,

    PrismaService,
    AuditLogService,
  ],

  exports: [
    PromptsService,
    PromptRuntimeService,
  ],
})
export class PromptsModule {}