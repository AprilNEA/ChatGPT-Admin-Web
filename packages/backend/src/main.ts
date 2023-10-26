import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

import { AllExceptionFilter } from '@/common/filters/all-execption.filter';
import { fastifyApp } from '@/common/adapter/fastify.adapter';
import { PrismaExceptionFilter } from '@/common/filters/prisma-client-execption';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyApp,
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
  await app.listen(configService.get('port').backend ?? 3001);
}

bootstrap();
