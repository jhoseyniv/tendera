import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Req,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';

import type { Request } from 'express';

import { PromptsService } from './prompts.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { WorkspaceAccessGuard } from '../workspaces/workspace-access.guard';
import { PromptRuntimeService } from './prompt-runtime.service';


@Controller('prompts')
@UseGuards(
  JwtAuthGuard,
  WorkspaceAccessGuard,
)
export class PromptsController {

  constructor(
    private readonly service: PromptsService,
        private readonly runtimeService: PromptRuntimeService

  ) {}

  @Post()
  async create(
    @Req() req: any,
    @Body() body: any,
  ) {

    return this.service.create({

      ...body,

      tenant_id:
        req.user.tenant_id,

      workspace_id:
        req.workspaceId,

      created_by:
        req.user.sub,
    });
  }

  @Get()
  async findAll(
    @Req() req: any,
    @Query() query: any,
  ) {

    return this.service.findAll({

      tenantId:
        req.user.tenant_id,

      workspaceId:
        req.workspaceId,

      page:
        Number(query.page) || 1,

      limit:
        Number(query.limit) || 20,

      search:
        query.search,

      category:
        query.category,

      modelId:
        query.modelId,

      isActive:
        query.isActive === undefined
          ? undefined
          : query.isActive === 'true',

      sortBy:
        query.sortBy,

      sortOrder:
        query.sortOrder,
    });
  }

  @Get(':id')
  async findOne(
    @Req() req: any,
    @Param('id') id: string,
  ) {

    return this.service.findOne(

      id,

      req.user.tenant_id,

      req.workspaceId,
    );
  }

  @Patch(':id')
  async update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: any,
  ) {

    return this.service.update(

      id,

      req.user.tenant_id,

      req.workspaceId,

      req.user.sub,

      body,
    );
  }

  @Delete(':id')
  async remove(
    @Req() req: any,
    @Param('id') id: string,
  ) {

    return this.service.delete(

      id,

      req.user.tenant_id,

      req.workspaceId,

      req.user.sub,
    );
  }

  @Get(':id/versions')
  async versions(
    @Req() req: any,
    @Param('id') id: string,
  ) {

    const prompt =
      await this.service.findOne(

        id,

        req.user.tenant_id,

        req.workspaceId,
      );

    return prompt?.versions ?? [];
  }
@Post(':id/execute')
@UseGuards(JwtAuthGuard, WorkspaceAccessGuard)
async executePrompt(
  @Req() req: any,
  @Param('id') promptId: string,
  @Body() body: any
) {
  const context = {
    tenantId: req.user.tenant_id,
    workspaceId: req.workspaceId,
    userId: req.user.sub,
  };

  return this.runtimeService.executePrompt(
    promptId,    // promptId اولین آرگومان
  body,
    context     // context سومین آرگومان
  );
}



}