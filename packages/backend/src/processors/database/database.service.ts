import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';

import { ConfigType } from 'shared';

import { initDatabase } from './init';

export type * from '@prisma/client';

export const monthDuration = 2592000;
export const quarterDuration = 7776000;
export const yearDuration = 31104000;

let isInitPrisma = false;

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  private openaiConfig: ConfigType['openai'];

  constructor(config: ConfigService) {
    super();
    /* This seems not working */
    process.env.DATABASE_URL = config.get('postgres').url;
    this.openaiConfig = config.get<ConfigType['openai']>('openai');
  }

  async onModuleInit() {
    try {
      await this.$connect();
      if (!isInitPrisma) {
        await initDatabase(this);
        const existingKeys = new Set(
          (
            await this.openAIKey.findMany({
              where: {
                key: {
                  in: this.openaiConfig.keys,
                },
              },
            })
          ).map((key) => key.key),
        );

        const keysToCreate = this.openaiConfig.keys.filter(
          (key) => !existingKeys.has(key),
        );

        await Promise.all(
          keysToCreate.map((key) =>
            this.openAIKey.create({
              data: {
                key,
              },
            }),
          ),
        );
        console.log('Prisma Already Init');
        isInitPrisma = true;
      }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientInitializationError) {
        console.log('数据库设置有误');
        process.exit(1);
      }
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2021') {
          console.log('数据库未初始化');
          process.exit(1);
        }
      }
      // console.log(JSON.stringify(e));
      throw e;
    }
  }
}
