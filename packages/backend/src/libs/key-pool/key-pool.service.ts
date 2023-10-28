import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@/processors/database/database.service';

import { makeKeyGetter } from './core';
import { makeWeightedSelector } from './selectors';

@Injectable()
export class KeyPoolService {
  constructor(private prisma: DatabaseService) {
    if (!prisma) throw new Error('prisma is undefined');
  }

  private async keys(): Promise<string[]> {
    const keys = await this.prisma.openAIKey.findMany({
      select: { key: true },
    });
    return keys.map(({ key }) => key);
  }

  private async weightsOf(keys: string[]): Promise<number[]> {
    const keysWithWeights = await this.keysWithWeigets();
    const keyWeightMap = new Map(
      keysWithWeights.map(({ key, weight }) => [key, weight]),
    );
    return keys.map((key) => keyWeightMap.get(key) ?? 0);
  }

  readonly select = makeKeyGetter(
    this.keys.bind(this),
    makeWeightedSelector(this.weightsOf.bind(this)),
  );

  keysWithWeigets() {
    return this.prisma.openAIKey.findMany();
  }

  set(keyWeights: Record<string, number>) {
    const operations = Object.entries(keyWeights).map(([key, weight]) =>
      this.prisma.openAIKey.upsert({
        where: { key },
        update: { weight },
        create: { key, weight },
      }),
    );
    return this.prisma.$transaction(operations);
  }

  unset(...keys: string[]) {
    return this.prisma.openAIKey.deleteMany({
      where: { key: { in: keys } },
    });
  }
}
