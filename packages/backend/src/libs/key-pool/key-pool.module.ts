import { Module } from '@nestjs/common';
import { KeyPoolService } from './key-pool.service';
import { DatabaseService } from '@/processors/database/database.service';

@Module({
  providers: [KeyPoolService, DatabaseService],
  exports: [KeyPoolService],
})
export class KeyPoolModule {}
