import { Injectable } from '@nestjs/common';
import WorkerPool from './workerPool';
import type { FilterData, MintWorkerInput, MintWorkerOutput } from './types';

@Injectable()
export class ContentSafeService {
  private pool = new WorkerPool<MintWorkerInput, MintWorkerOutput>('worker.ts');

  async setKeys(keys: string[]): Promise<void> {
    await this.pool.executeAll({ type: 'set-keys', keys });
  }

  async filter(text: string, replace?: boolean): Promise<FilterData> {
    const output = await this.pool.execute({ type: 'filter', text, replace });
    if (output.type !== 'filter') return;
    return output.data;
  }

  async verify(text: string): Promise<boolean> {
    const output = await this.pool.execute({ type: 'verify', text });
    if (output.type !== 'verify') return;
    return output.pass;
  }
}
