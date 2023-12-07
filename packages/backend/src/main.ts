import * as fs from 'fs';
import { join } from 'path';
import * as process from 'process';

import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

import { fastifyApp } from '@/common/adapter/fastify.adapter';
import { ConfigService } from '@/common/config';
import { AllExceptionFilter } from '@/common/filters/all-execption.filter';
import { PrismaExceptionFilter } from '@/common/filters/prisma-client-execption';

import { AppModule } from './app.module';

const CONFIG_PATH = join(__dirname, '../../config.json');

const DEFAULT_CONFIG = {
  mode: 'nginx',
  title: 'ChatGPT Admin Web',
  frontend: {
    port: 3000,
  },
  backend: {
    port: 3001,
  },
  jwt: {
    algorithm: 'HS256',
    secret: 'secret',
  },
  postgres: undefined,
  redis: undefined,
};
require('dotenv').config();

function checkConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    if (!process.env.DATABASE_URL || !process.env.REDIS_URL) {
      console.error(
        '请设置环境变量 DATABASE_URL 和 REDIS_URL' +
          'Please set the environment variables DATABASE_URL and REDIS_URL.',
      );
      process.exit();
    }
    DEFAULT_CONFIG.postgres = { url: process.env.DATABASE_URL };
    DEFAULT_CONFIG.redis = { url: process.env.REDIS_URL };

    fs.writeFileSync(CONFIG_PATH, JSON.stringify(DEFAULT_CONFIG, null, 2));

    console.log('配置文件已生成。\nThe configuration file has been generated.');
  } else {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));

    if (!config?.postgres?.url || !config?.redis?.url) {
      if (!config?.postgres?.url) {
        if (!process.env.DATABASE_URL) {
          console.error('Please set the environment variable DATABASE_URL.');
          process.exit();
        }
        config.postgres.url = process.env.DATABASE_URL;
      }

      if (!config?.redis?.url) {
        if (!process.env.REDIS_URL) {
          console.error('Please set the environment variable REDIS_URL.');
          process.exit();
        }
        config.redis.url = process.env.REDIS_URL;
      }

      fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
    }

    console.log('The configuration file has been checked.');
  }
}

async function bootstrap() {
  checkConfig();

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
  await app.listen(
    configService.get('backend').port ??
      configService.get('port')?.backend ??
      3001,
  );
}

bootstrap();
