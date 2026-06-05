import OpenAI from 'openai';

import {
  Injectable,
  BadRequestException
} from '@nestjs/common';

import {
  AIExecutionResult
} from './interfaces/ai-execution-result.interface';

import {
  AIProviderException
} from './exceptions/ai-provider.exception';

import {
  QuotaExceededException
} from './exceptions/quota-exceeded.exception';

import {
  RateLimitException
} from './exceptions/rate-limit.exception';

@Injectable()
export class AIService {

  private openai = new OpenAI({

    apiKey:
      process.env.OPENAI_API_KEY
  });

  private deepseek = new OpenAI({

  apiKey:
    process.env.DEEPSEEK_API_KEY,

  baseURL:
    'https://api.deepseek.com'
});

  async execute(

    prompt: string,

    model: string

  ): Promise<AIExecutionResult> {

    switch (model) {

      case 'gpt-4o':

        return this.executeOpenAI(
          prompt
        );

      case 'claude-sonnet':

        return this.executeClaude(
          prompt
        );

      case 'gemini-pro':

        return this.executeGemini(
          prompt
        );

     case 'deepseek-chat':

      return this.executeDeepSeek(
        prompt,
        'deepseek-chat'
      );

    case 'deepseek-reasoner':

      return this.executeDeepSeek(
        prompt,
        'deepseek-reasoner'
      );
        
      default:

        throw new BadRequestException(

          `Unsupported model: ${model}`
        );
    }
  }


private async executeDeepSeek(

  prompt: string,

  model: string

): Promise<AIExecutionResult> {

  try {

    const response =

      await this.deepseek.chat.completions.create({

        model,

        messages: [

          {
            role: 'user',

            content: prompt
          }
        ],

        temperature: 0.2
      });

    return {

      provider:
        'deepseek',

      model,

      output:

        response
          .choices[0]
          .message
          .content ?? '',

      usage: {

        prompt_tokens:

          response
            .usage
            ?.prompt_tokens ?? 0,

        completion_tokens:

          response
            .usage
            ?.completion_tokens ?? 0,

        total_tokens:

          response
            .usage
            ?.total_tokens ?? 0
      }
    };

  } catch (error: any) {

    if (
      error?.code ===
      'insufficient_quota'
    ) {

      throw new QuotaExceededException(

        'deepseek',

        error.message
      );
    }

    if (
      error?.status === 429
    ) {

      throw new RateLimitException(

        'deepseek',

        error.message
      );
    }
    if (
  error?.status === 402
) {

  throw new AIProviderException(

    'deepseek',

    'INSUFFICIENT_BALANCE',

    error.message
  );
}
    throw new AIProviderException(

      'deepseek',

      'UNKNOWN',

      error?.message ??
      'Unknown DeepSeek error'
    );
  }
}

private async executeOpenAI(
  prompt: string
): Promise<AIExecutionResult> {

  try {

    const response =

      await this.openai.chat.completions.create({

        model: 'gpt-4o',

        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],

        temperature: 0.2
      });

    return {

      provider: 'openai',

      model: 'gpt-4o',

      output:
        response.choices[0].message.content ?? '',

      usage: {

        prompt_tokens:
          response.usage?.prompt_tokens ?? 0,

        completion_tokens:
          response.usage?.completion_tokens ?? 0,

        total_tokens:
          response.usage?.total_tokens ?? 0
      }
    };

  } catch (error: any) {

    if (
      error?.code ===
      'insufficient_quota'
    ) {

      throw new QuotaExceededException(

        'openai',

        error.message
      );
    }

    if (
      error?.status === 429
    ) {

      throw new RateLimitException(

        'openai',

        error.message
      );
    }

    throw new AIProviderException(

      'openai',

      'UNKNOWN',

      error?.message ??
      'Unknown OpenAI error'
    );
  }
}

  private async executeClaude(

    prompt: string

  ): Promise<AIExecutionResult> {

    return {

      provider:
        'claude',

      model:
        'claude-sonnet',

      output:
        prompt,

      usage: {

        prompt_tokens: 0,

        completion_tokens: 0,

        total_tokens: 0
      }
    };
  }

  private async executeGemini(

    prompt: string

  ): Promise<AIExecutionResult> {

    return {

      provider:
        'gemini',

      model:
        'gemini-pro',

      output:
        prompt,

      usage: {

        prompt_tokens: 0,

        completion_tokens: 0,

        total_tokens: 0
      }
    };
  }
}
