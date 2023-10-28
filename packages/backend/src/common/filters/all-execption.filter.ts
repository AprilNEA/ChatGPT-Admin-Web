import { FastifyReply, FastifyRequest } from 'fastify';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ErrorCode } from 'shared';

export { ErrorCode };

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    if (request.method === 'OPTIONS') {
      return response.status(HttpStatus.OK).send();
    }

    const code =
      (exception as any)?.response?.code || HttpStatus.INTERNAL_SERVER_ERROR;

    const message = (exception as any)?.response?.message || 'Unknown Error';

    response.status(200).type('application/json').send({
      success: false,
      code,
      message,
    });
  }
}
