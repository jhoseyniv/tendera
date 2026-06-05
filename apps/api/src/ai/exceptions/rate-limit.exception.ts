import {

  AIProviderException

} from './ai-provider.exception';

export class RateLimitException

  extends AIProviderException {

  constructor(

    provider: string,

    message: string

  ) {

    super(

      provider,

      'RATE_LIMIT',

      message
    );
  }
}
