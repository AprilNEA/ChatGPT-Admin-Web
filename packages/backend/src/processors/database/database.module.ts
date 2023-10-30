import { Global, Module } from '@nestjs/common';

import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
@Global()
export class DatabaseModule {}
