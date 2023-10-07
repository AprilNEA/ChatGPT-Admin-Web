import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PrismaService } from '@/processors/database/prisma.service';
import { OpenaiModule } from '@libs/openai';
import { KeyPoolModule } from '@libs/key-pool';

@Module({
  imports: [OpenaiModule, KeyPoolModule],
  controllers: [ChatController],
  providers: [ChatService, PrismaService],
})
export class ChatModule {}
