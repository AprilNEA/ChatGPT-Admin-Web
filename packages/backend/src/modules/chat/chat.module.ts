import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { DatabaseService } from '@/processors/database/database.service';
import { KeyPoolModule } from '@/libs/key-pool/key-pool.module';

@Module({
  imports: [KeyPoolModule],
  controllers: [ChatController],
  providers: [ChatService, DatabaseService],
})
export class ChatModule {}
