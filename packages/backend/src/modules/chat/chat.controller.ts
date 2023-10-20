import { Body, Controller, Get, Param, Post, Sse } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Payload, Public } from '@/common/guards/auth.guard';
import { NewMessageDto } from 'shared';
import { ErrorCode, ServerException } from '@/error.filter';
import { KeyPoolService } from '@/libs/key-pool';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly keyPool: KeyPoolService,
  ) {}

  @Get('sessions')
  getChatSession(@Payload('id') userId: number) {
    return this.chatService.getRecentChatSession(userId);
  }

  @Get('messages/:sid')
  async getChatMessages(
    @Payload('id') userId: number,
    @Param('sid') sessionId: string,
  ) {
    const data = await this.chatService.getChatMessages(userId, sessionId);
    if (!data) {
      return {
        sid: sessionId,
        topic: '新的话题',
        messages: [
          {
            role: 'system',
            content: '你好，请问有什么可以帮助您？',
          },
        ],
        updateAt: new Date(),
        _count: {
          messages: 1,
        },
      };
    }
    return {
      ...data,
      messages: data.messages.map((m) => ({
        ...m,
        role: m.role.toLowerCase(),
      })),
    };
  }

  /* 新建用户流式传输的对话 */
  @Post('messages/:sid?')
  @Sse()
  async newMessageStream(
    @Payload('id') uid: number,
    @Body() data: NewMessageDto,
    @Param('sid') sid: string,
  ) {
    const isValid = await this.chatService.limitCheck(uid, data.mid);
    if (!isValid) {
      throw new ServerException(ErrorCode.LimitExceeded, '超过当前计划用量');
    }
    const chatSession = await this.chatService.getOrNewChatSession(
      sid,
      uid,
      data.memoryPrompt,
    );
    const key = await this.keyPool.select();
    return await this.chatService.newMessageStream({
      userId: uid,
      sessionId: chatSession.id,
      modelId: data.mid,
      content: data.content,
      messages: chatSession.messages,
      key,
    });
  }
}
