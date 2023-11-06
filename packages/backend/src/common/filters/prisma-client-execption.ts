import { FastifyReply, FastifyRequest } from 'fastify';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    // const request = ctx.getRequest<FastifyRequest>();

    let message = 'unknown database error';
    switch (exception.code) {
      case 'P2001':
      case 'P2002':
        message = 'Not found (P2002)';
        break;
      default:
        message = 'database error';
    }

    response.status(400).type('application/json').send({
      success: false,
      message,
    });
  }
}
