import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async listOpenaiKeys() {
    return this.prisma.openAIKey.findMany();
  }

  async addOpenaiKey(key: string) {
    return this.prisma.openAIKey.create({ data: { key } });
  }
}
