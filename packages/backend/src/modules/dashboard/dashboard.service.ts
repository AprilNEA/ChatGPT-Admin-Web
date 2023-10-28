import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@/processors/database/database.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: DatabaseService) {}

  async listOpenaiKeys() {
    return this.prisma.openAIKey.findMany();
  }

  async addOpenaiKey(key: string) {
    return this.prisma.openAIKey.create({ data: { key } });
  }
}
