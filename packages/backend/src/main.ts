import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

import { fastifyApp } from '@/common/adapter/fastify.adapter';
import { ConfigService } from '@/common/config';
import { AllExceptionFilter } from '@/common/filters/all-execption.filter';
import { PrismaExceptionFilter } from '@/common/filters/prisma-client-execption';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyApp,
    {
      rawBody: true,
    },
  );
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: '*',
    methods: '*',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalFilters(new PrismaExceptionFilter());
  app.setGlobalPrefix('api');
  await app.listen(configService.get('port').backend ?? 3001);
}

bootstrap();
