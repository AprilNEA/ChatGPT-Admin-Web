import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ServerExceptionFilter } from '@/error.filter';
import { PrismaExceptionFilter } from '@/prisma/prisma.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
