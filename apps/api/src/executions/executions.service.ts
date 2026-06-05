import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ExecutionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.ai_executions.create({ data });
  }

  async findOne(id: string, tenantId: string, workspaceId?: string) {
    const execution = await this.prisma.ai_executions.findUnique({ where: { id } });
    if (!execution) throw new NotFoundException('Execution not found');
    if (execution.tenant_id !== tenantId || (workspaceId && execution.workspace_id !== workspaceId)) {
      throw new ForbiddenException('Tenant or workspace access denied');
    }
    return execution;
  }

  async findAll(params: {
    tenantId: string;
    workspaceId?: string;
    page?: number;
    limit?: number;
    status?: string;
    model?: string;
  }) {
    const { tenantId, workspaceId, page = 1, limit = 20, status, model } = params;

    const where: any = { tenant_id: tenantId };
    if (workspaceId) where.workspace_id = workspaceId;
    if (status) where.status = status;
    if (model) where.model = model;

    const [items, total] = await this.prisma.$transaction([
      this.prisma.ai_executions.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.ai_executions.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(id: string, tenantId: string, workspaceId: string | undefined, data: any) {
    const existing = await this.findOne(id, tenantId, workspaceId);
    return this.prisma.ai_executions.update({ where: { id }, data });
  }

  async delete(id: string, tenantId: string, workspaceId?: string) {
    const existing = await this.findOne(id, tenantId, workspaceId);
    // Soft delete
    return this.prisma.ai_executions.update({ where: { id }, data: { status: 'deleted' } });
  }
}