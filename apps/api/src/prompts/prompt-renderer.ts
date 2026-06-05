import { Injectable } from '@nestjs/common';
import { PromptRuntimeService } from './prompt-runtime.service';

@Injectable()
export class PromptRenderer {
  constructor(private readonly runtimeService: PromptRuntimeService) {}

  async render(tenantId: string, workspaceId: string, promptId: string, variables: any) {
    const result = await this.runtimeService.executePrompt(tenantId, workspaceId, promptId, variables);
    return {
      output: result.output,
      version: result.version,
      promptId: result.promptId,
    };
  }
}