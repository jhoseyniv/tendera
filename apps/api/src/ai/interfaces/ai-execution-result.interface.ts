export interface AIUsage {

  prompt_tokens: number;

  completion_tokens: number;

  total_tokens: number;
}

export interface AIExecutionResult {

  provider: string;

  model: string;

  output: string;

  usage?: AIUsage;
}
