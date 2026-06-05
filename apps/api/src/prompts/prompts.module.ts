import { Module } from '@nestjs/common';
import { PromptsService } from './prompts.service';
import { PromptsController } from './prompts.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditLogService } from '../audit/audit-log.service';
import { AuthModule } from '../auth/auth.module';
import { PromptRuntimeService } from './prompt-runtime.service';

@Module({
  imports: [AuthModule],
  controllers: [PromptsController],
  providers: [PromptsService, PrismaService,    PromptRuntimeService, AuditLogService],
  exports: [PromptsService,PromptRuntimeService],
})
export class PromptsModule {}