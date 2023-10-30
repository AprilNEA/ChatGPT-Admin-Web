import { Module } from '@nestjs/common';

import { DatabaseService } from '@/processors/database/database.service';

import { KeyPoolService } from './key-pool.service';

@Module({
  providers: [KeyPoolService, DatabaseService],
  exports: [KeyPoolService],
})
export class KeyPoolModule {}
