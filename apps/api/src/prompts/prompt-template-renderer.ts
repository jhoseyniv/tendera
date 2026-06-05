import { Injectable } from '@nestjs/common';

@Injectable()
export class PromptTemplateRenderer {

  render(
    template: string,
    variables: Record<string, any>,
  ): string {

    let rendered = template;

    for (const [key, value] of Object.entries(variables)) {

      rendered = rendered.replace(
        new RegExp(`{{\\s*${key}\\s*}}`, 'g'),
        String(value),
      );
    }

    return rendered;
  }
}