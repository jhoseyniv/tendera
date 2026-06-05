import {

  AIProviderException

} from './ai-provider.exception';

export class QuotaExceededException

  extends AIProviderException {

  constructor(

    provider: string,

    message: string

  ) {

    super(

      provider,

      'QUOTA_EXCEEDED',

      message
    );
  }
}
