import {

  ExceptionFilter,

  Catch,

  ArgumentsHost,

  HttpStatus

} from '@nestjs/common';

import {

  AIProviderException

} from '../../ai/exceptions/ai-provider.exception';

@Catch(
  AIProviderException
)
export class AIExceptionFilter
  implements ExceptionFilter {

  catch(

    exception: AIProviderException,

    host: ArgumentsHost

  ) {

    const response =

      host
        .switchToHttp()
        .getResponse();

    response
      .status(
        HttpStatus.BAD_REQUEST
      )
      .json({

        success: false,

        provider:
          exception.provider,

        code:
          exception.code,

        message:
          exception.message
      });
  }
}

