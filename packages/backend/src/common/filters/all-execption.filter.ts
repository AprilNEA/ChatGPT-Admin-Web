import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
  Inject,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Request, Response } from 'express';
import { ErrorCode } from 'shared';

export { ErrorCode };

type appError = {
  readonly code: number;
  readonly message?: string;
};

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
      exception instanceof HttpException
        ? exception.getStatus()
        : (exception as appError)?.code || HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      (exception as any)?.response?.message ||
      (exception as appError)?.message ||
      'Unknown Error';

    response.status(200).type('application/json').send({
      success: false,
      code,
      message,
    });
  }
}
