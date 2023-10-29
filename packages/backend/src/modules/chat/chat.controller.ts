import * as Joi from 'joi';

import { Body, Controller, Get, Param, Post, Sse } from '@nestjs/common';

import { BizException } from '@/common/exceptions/biz.exception';
import { Payload } from '@/common/guards/auth.guard';
import { JoiValidationPipe } from '@/common/pipes/joi';
import { KeyPoolService } from '@/libs/key-pool';

import { NewMessageDto } from 'shared';
import { ErrorCodeEnum } from 'shared/dist/error-code';

import { ChatService } from './chat.service';

const newMessageSchema = Joi.object({
  modelId: Joi.number().required(),
  content: Joi.string().required(),
  memoryPrompt: Joi.string().optional(),
});

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly keyPool: KeyPoolService,
  ) {}

  /* 获取最近的 session 列表 */
  @Get('sessions')
  getChatSession(@Payload('id') userId: number) {
    return this.chatService.getRecentChatSession(userId);
  }

  /* 获取具体 session 的消息历史 */
  @Get('messages/:sessionId')
  async getChatMessages(
    @Payload('id') userId: number,
    @Param('sessionId') sessionId: string,
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

  /* 获取对话的总结，每一个对话的总结仅会发生一次 */
  @Post('summary/:sessionId')
  async getSummary(
    @Payload('id') userId: number,
    @Param('sessionId') sessionId: string,
  ) {
    const data = await this.chatService.getChatMessages(userId, sessionId);
    if (!data) {
      throw new BizException(ErrorCodeEnum.SessionNotFound);
    }
    if (data.topic) {
      return {
        success: true,
        data: {
          topic: data.topic,
        },
      };
    }
    if (data.messages.length > 1) {
      const topic = await this.chatService.summarizeTopic(
        data.messages[1].content,
        sessionId,
      );
      return {
        success: true,
        data: {
          topic,
        },
      };
    }
    return {
      success: true,
      data: {
        topic: undefined,
      },
    };
  }

  /* 新建用户流式传输的对话 */
  @Post('messages/:sessionId?')
  @Sse()
  async newMessageStream(
    @Payload('id') userId: number,
    @Body(new JoiValidationPipe(newMessageSchema)) data: NewMessageDto,
    @Param('sessionId') sessionId: string,
  ) {
    /* 用量限制 */
    // const isValid = await this.chatService.limitCheck(uid, data.mid);
    // if (!isValid) {
    //   // throw new appException(ErrorCode.LimitExceeded, '超过当前计划用量');
    // }
    /* */

    const chatSession = await this.chatService.getOrNewChatSession(
      sessionId,
      userId,
      data.memoryPrompt,
    );

    /* 从 Key Pool 中挑选合适的 Key */
    // const key = await this.keyPool.select();
    return await this.chatService.newMessageStream({
      userId: userId,
      sessionId: chatSession.id,
      modelId: data.modelId,
      input: data.content,
      messages: chatSession.messages,
      // key,
    });
  }
}
