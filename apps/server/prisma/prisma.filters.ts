import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@/prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    switch (exception.code) {
      case 'P2001':
      case 'P2002':
        response.status(404).json({
          success: false,
          message: 'Not found',
        });
        break;
      default:
        response.status(500).json({
          success: false,
          message: 'Database error',
        });
    }
  }
}
