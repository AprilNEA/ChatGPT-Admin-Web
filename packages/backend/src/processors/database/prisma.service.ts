import { CustomPrismaClientFactory } from 'nestjs-prisma';

import { Injectable } from '@nestjs/common';

import {
  type ExtendedPrismaClient,
  createExtendedPrismaClient,
} from './prisma.extension';

@Injectable()
export class ExtendedPrismaConfigService
  implements CustomPrismaClientFactory<ExtendedPrismaClient>
{
  private readonly url: string;

  constructor() {
    // TODO Read from configuration file
    this.url = process.env.DATABASE_URL;
  }

  createPrismaClient(): ExtendedPrismaClient {
    return createExtendedPrismaClient({ url: this.url });
  }
}
