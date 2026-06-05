import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

interface FindAllOptions {
  tenantId: string;
  workspaceId?: string;
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  modelId?: string;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

@Injectable()
export class PromptsService {
  constructor(private prisma: PrismaService

  ) {}

  async create(data: any) {
    if (!data.model_id) {
      throw new BadRequestException('model_id is required');
    }
    const model = await this.prisma.ai_models.findFirst({
      where: {
        tenant_id: data.tenant_id,
        workspace_id: data.workspace_id,
        id: data.model_id,
        is_active: true,
      },
    });
    if (!model) {
      throw new BadRequestException(`Model '${data.model_id}' is not registered`);
    }
    return this.prisma.prompts.create({ data });
  }

  async findAll(options: FindAllOptions) {
  const { tenantId, workspaceId, page = 1, limit = 20, search, modelId, sortBy, sortOrder } = options;

  const where: any = {
    tenant_id: tenantId,
    workspace_id: workspaceId,
    is_active: true,
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { category: { contains: search, mode: 'insensitive' } },
      { user_template: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (modelId) {
    where.model_id = modelId;
  }

  const orderBy: any = {};
  if (sortBy) {
    orderBy[sortBy] = sortOrder ?? 'asc';
  }

  const prompts = await this.prisma.prompts.findMany({
    where,
    orderBy,
    skip: (page - 1) * limit,
    take: limit,
    include: { versions: true },
  });

  const total = await this.prisma.prompts.count({ where });

  return { data: prompts, total, page, limit };
}
  
  async findOne(id: string, tenantId: string, workspaceId?: string) {
    const prompt = await this.prisma.prompts.findFirst({
      where: { id, tenant_id: tenantId, workspace_id: workspaceId },
      include: { versions: true },
    });
    if (!prompt) throw new BadRequestException('Prompt not found');
    return prompt;
  }

  async update(id: string, tenantId: string, workspaceId: string, userId: string, data: any) {
    const prompt = await this.findOne(id, tenantId, workspaceId);
    return this.prisma.prompts.update({
      where: { id: prompt.id },
      data: { ...data },
    });
  }

  async delete(id: string, tenantId: string, workspaceId: string, userId: string) {
    const prompt = await this.findOne(id, tenantId, workspaceId);
    return this.prisma.prompts.delete({ where: { id: prompt.id } });
  }
}