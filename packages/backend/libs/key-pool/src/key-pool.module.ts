import { Module } from '@nestjs/common';
import { KeyPoolService } from './key-pool.service';
import { PrismaService } from '@/processors/database/prisma.service';

@Module({
  providers: [KeyPoolService, PrismaService],
  exports: [KeyPoolService],
})
export class KeyPoolModule {}
