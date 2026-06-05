export class AIProviderException extends Error {

  constructor(

    public readonly provider: string,

    public readonly code: string,

    message: string

  ) {

    super(message);

    this.name = 'AIProviderException';
  }
}
