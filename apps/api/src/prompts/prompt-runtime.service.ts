import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PromptRuntimeService {
  constructor(private readonly prisma: PrismaService) {}

  async executePrompt(tenantId: string, workspaceId: string, promptId: string, input: any) {
    const prompt = await this.prisma.prompts.findFirst({
      where: { id: promptId, tenant_id: tenantId, workspace_id: workspaceId, is_active: true },
      include: { versions: true },
    });

    if (!prompt) throw new NotFoundException('Prompt not found');

    const activeVersion = prompt.versions.find(v => v.is_active);
    if (!activeVersion) throw new NotFoundException('Active version not found');

    return {
      promptId: prompt.id,
      version: activeVersion.version,
      output: `Executed with input: ${JSON.stringify(input)}`,
    };
  }
}