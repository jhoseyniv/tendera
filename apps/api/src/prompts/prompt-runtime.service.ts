import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PromptTemplateRenderer } from './prompt-template-renderer';
import { VariableValidator } from './variable-validator';
import { AIService } from '../ai/ai.service';

@Injectable()
export class PromptRuntimeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AIService,
    private readonly renderer: PromptTemplateRenderer,
    private readonly validator: VariableValidator,
  ) {}

  // لیست نسخه‌های Prompt
  async listVersions(promptId: string) {
    return this.prisma.prompt_versions.findMany({
      where: { prompt_id: promptId },
      orderBy: { created_at: 'desc' },
    });
  }

  // متد برای گرفتن نسخه فعال
  async getActiveVersion(promptId: string) {
    const versions = await this.prisma.prompt_versions.findMany({
      where: { prompt_id: promptId, is_active: true },
      orderBy: { created_at: 'desc' },
    });

    if (!versions || versions.length === 0) {
      throw new NotFoundException('No active prompt version found');
    }

    return versions[0];
  }

 async executePrompt(
  promptId: string,
  variables: Record<string, any>,
  context: { tenantId: string; workspaceId: string; userId: string },
) {
  // Load Prompt با Relation ai_model و نسخه‌ها
  const prompt = await this.prisma.prompts.findFirst({
    where: {
      id: promptId,
      tenant_id: context.tenantId,
      workspace_id: context.workspaceId,
      is_active: true,
    },
    include: {
      versions: true,
      ai_model: true,
    },
  });

  if (!prompt) throw new NotFoundException('Prompt not found');

  const activeVersion = prompt.versions.find(v => v.is_active);
  if (!activeVersion) throw new NotFoundException('Active version not found');

  // Variable Validation
  if (activeVersion.variable_schema) {
    this.validator.validateVariables(activeVersion.variable_schema, variables);
  }

  // Render user_template
  const renderedUserTemplate = this.renderer.render(activeVersion.user_template, variables);

  // Combine with system_prompt
  const finalPrompt = `
${activeVersion.system_prompt}

${renderedUserTemplate}
`;

  // Check AI model
  if (!prompt.ai_model) {
    throw new BadRequestException('Prompt does not have AI model assigned');
  }

  // Execute AI
  const aiResult = await this.aiService.execute(finalPrompt, prompt.ai_model.api_model);

  // Log Execution
  await this.prisma.ai_executions.create({
    data: {
      tenant_id: context.tenantId,
      workspace_id: context.workspaceId,
      user_id: context.userId,
      prompt_id: prompt.id,
      prompt_version_id: activeVersion.id,
      model: prompt.ai_model.api_model,
      variables,
      rendered_prompt: finalPrompt,
      output: JSON.stringify(aiResult),
      status: 'success',
      prompt_tokens:  aiResult.usage?.prompt_tokens ?? 0,
      completion_tokens: aiResult.usage?.completion_tokens ?? 0,
      total_tokens: aiResult.usage?.total_tokens ?? 0,

   },
  });

      // Step 2: Update Usage Counters
      await this.prisma.usage_counters.update({
        where: { tenant_id: context.tenantId },
        data: {
          ai_tokens_used: {
            increment: aiResult.usage?.total_tokens ?? 0,
          },
          updated_at: new Date(),
        },
      });

  return {
    output: aiResult.output,
    version: activeVersion.version,
    promptId: prompt.id,
    model: prompt.ai_model.name,
    provider: prompt.ai_model.provider,
    usage: aiResult.usage,
  };
}
  // متد رندر نسخه مشخص
  async renderVersion(promptVersionId: string, variables: Record<string, any>) {
    const version = await this.prisma.prompt_versions.findUnique({ where: { id: promptVersionId } });
    if (!version) throw new NotFoundException('Prompt Version not found');

    if (version.variable_schema) {
      this.validator.validateVariables(version.variable_schema, variables);
    }

    return this.renderer.render(version.user_template, variables);
  }
}