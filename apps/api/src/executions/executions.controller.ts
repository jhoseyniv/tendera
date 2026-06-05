import { Controller, Get, Post, Patch, Delete, Req, Body, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WorkspaceAccessGuard } from '../workspaces/workspace-access.guard';
import { ExecutionsService } from './executions.service';

@Controller('executions')
export class ExecutionsController {
  constructor(private service: ExecutionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, WorkspaceAccessGuard)
  async create(@Req() req: any, @Body() body: any) {
    return this.service.create({
      ...body,
      tenant_id: req.user.tenant_id,
      workspace_id: req.workspaceId,
      user_id: req.user.sub,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, WorkspaceAccessGuard)
  async findOne(@Param('id') id: string, @Req() req: any) {
    return this.service.findOne(id, req.user.tenant_id, req.workspaceId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, WorkspaceAccessGuard)
  async findAll(@Req() req: any, @Query() query: any) {
    return this.service.findAll({
      tenantId: req.user.tenant_id,
      workspaceId: req.workspaceId,
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 20,
      status: query.status,
      model: query.model,
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, WorkspaceAccessGuard)
  async update(@Param('id') id: string, @Req() req: any, @Body() body: any) {
    return this.service.update(id, req.user.tenant_id, req.workspaceId, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, WorkspaceAccessGuard)
  async delete(@Param('id') id: string, @Req() req: any) {
    return this.service.delete(id, req.user.tenant_id, req.workspaceId);
  }
}