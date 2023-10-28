import { Module } from '@nestjs/common';

import { KeyPoolModule } from '@/libs/key-pool/key-pool.module';
import { DatabaseService } from '@/processors/database/database.service';

import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

@Module({
  imports: [KeyPoolModule],
  controllers: [ChatController],
  providers: [ChatService, DatabaseService],
})
export class ChatModule {}
