import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { ServerExceptionFilter } from '@/error.filter';
import { PrismaExceptionFilter } from '@/prisma/prisma.filters';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: '*',
    methods: '*',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.useGlobalFilters(new ServerExceptionFilter());
  app.useGlobalFilters(new PrismaExceptionFilter());
  await app.listen(configService.get('port').backend ?? 3001);
}

bootstrap();
