import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorCode } from '@caw/types';
export { ErrorCode };
export class ServerException extends Error {
  constructor(
    public readonly code: ErrorCode,
    public readonly message: string,
  ) {
    super();
  }
}

@Catch(ServerException)
export class ServerExceptionFilter implements ExceptionFilter {
  catch(exception: ServerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    response.status(200).json({
      success: false,
      code: exception.code,
      message: exception.message,
    });
  }
}
