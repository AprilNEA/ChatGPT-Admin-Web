import { CustomPrismaService } from 'nestjs-prisma';

import { Inject, Injectable } from '@nestjs/common';

import { ExtendedPrismaClient } from '@/processors/database/prisma.extension';

@Injectable()
export class DashboardService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  async listOpenaiKeys() {
    return this.prisma.client.openAIKey.findMany();
  }

  async addOpenaiKey(key: string) {
    return this.prisma.client.openAIKey.create({ data: { key } });
  }
}
