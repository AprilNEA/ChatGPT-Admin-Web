import { CustomPrismaClientFactory } from 'nestjs-prisma';

import { Injectable } from '@nestjs/common';

import { ConfigService } from '@/common/config';

import {
  type ExtendedPrismaClient,
  createExtendedPrismaClient,
} from './prisma.extension';

@Injectable()
export class ExtendedPrismaConfigService
  implements CustomPrismaClientFactory<ExtendedPrismaClient>
{
  private readonly url: string;

  constructor(configService: ConfigService) {
    this.url = configService?.get('postgres')?.url ?? process.env.DATABASE_URL;
  }

  createPrismaClient(): ExtendedPrismaClient {
    return createExtendedPrismaClient({ url: this.url });
  }
}
