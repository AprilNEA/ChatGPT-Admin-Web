import { Module } from '@nestjs/common';
import { ContentSafeService } from './content-safe.service';

@Module({
  providers: [ContentSafeService],
  exports: [ContentSafeService],
})
export class ContentSafeModule {}
