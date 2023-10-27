import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/processors/database/database.service';
import { type ChatMessage, ChatMessageRole } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { BizException } from '@/common/exceptions/biz.exception';
import { ErrorCodeEnum } from 'shared/dist/error-code';
import { encode as gpt4Encode } from 'gpt-tokenizer/esm/model/gpt-4';
import { encode as gpt435Encode } from 'gpt-tokenizer/esm/model/gpt-3.5-turbo';

@Injectable()
export class ChatService {
  private openaiConfig;
  private openai: OpenAI;

  constructor(
    private prisma: DatabaseService,
    config: ConfigService,
  ) {
    this.openaiConfig = config.get('openai');
  }

  /* 获取指定用户最近时间内消息的总计，用于limit */
  async getRecentMessageCount(
    userId: number,
    duration: number,
    currentTime?: Date,
  ) {
    currentTime = currentTime || new Date();
    const startTime = new Date(currentTime.getTime() - duration * 1000);

    return this.prisma.chatMessage.count({
      where: {
        userId: userId,
        createdAt: {
          gte: startTime,
          lte: currentTime,
        },
      },
    });
  }

  /* 用量限制 */
  async limitCheck(userId: number, mid: number) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });
    const currentTime = new Date();
    const orders = await this.prisma.order.findMany({
      where: {
        AND: [
          {
            startAt: {
              lte: currentTime,
            },
          },
          {
            endAt: {
              gte: currentTime,
            },
          },
        ],
      },
    });
    const productId = orders.length !== 0 ? orders[0].productId : 1;

    const limit = await this.prisma.modelInProduct.findUniqueOrThrow({
      where: {
        modelId_productId: {
          modelId: mid,
          productId: productId,
        },
      },
    });
    const messageCount = await this.getRecentMessageCount(
      userId,
      limit.duration,
      currentTime,
    );
    if (limit.times - messageCount > 0) {
      return true;
    }
    return false;
  }

  /* 获取或者新建一个对话，通常用于初始化 */
  async getOrNewChatSession(
    sessionId: string,
    userId: number,
    memoryPrompt?: string,
    limit = 10,
  ) {
    return this.prisma.$transaction(async (prisma) => {
      const chatSession = await prisma.chatSession.upsert({
        where: {
          id: sessionId,
        },
        update: {},
        create: {
          id: sessionId,
          memoryPrompt,
          user: { connect: { id: userId } },
        },
        include: {
          messages: {
            take: limit,
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
      });
      if (chatSession.userId !== userId) {
        throw new BizException(ErrorCodeEnum.ValidationError);
      }
      return chatSession;
    });
  }

  /* 获取消息 */
  async getChatMessages(uid: number, sid: string, limit = 10) {
    return this.prisma.chatSession.findUnique({
      where: {
        id: sid,
        userId: uid,
      },
      include: {
        messages: {
          // take: limit,
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }

  /* 获取最近对话 */
  async getRecentChatSession(uid: number, limit = 10) {
    return this.prisma.chatSession.findMany({
      take: limit,
      where: {
        userId: uid,
      },
      include: {
        _count: {
          select: {
            messages: true,
          },
        },
      },
    });
  }

  async #streamChat({
    input,
    model,
    histories = [],
  }: {
    input: string;
    model: OpenAI.Chat.ChatCompletionCreateParams['model'];
    histories?: OpenAI.Chat.CreateChatCompletionRequestMessage[];
  }) {
    const openai = new OpenAI({
      baseURL: this.openaiConfig.baseUrl,
      apiKey: this.openaiConfig.keys[0],
    });
    return openai.chat.completions.create({
      model,
      messages: [
        ...histories,
        {
          role: 'user',
          content: input,
        },
      ],
      stream: true,
    });
  }

  /* 指定对话中创建新消息 */
  async newMessageStream({
    userId,
    sessionId,
    input,
    modelId,
    messages, // key,
  }: {
    userId: number;
    sessionId: string;
    modelId: number;
    /* User input */
    input: string;
    /* Messages in database */
    messages: ChatMessage[];
    /* Request API Key */
    // key: string;
  }) {
    const { name: model } = await this.prisma.model.findUniqueOrThrow({
      where: { id: modelId },
    });

    const histories: OpenAI.ChatCompletionMessage[] = messages.map(
      ({ role, content }) => ({
        role: role.toLowerCase() as OpenAI.ChatCompletionRole,
        content,
      }),
    );

    const stream = await this.#streamChat({
      model: model,
      input: input,
      histories: histories,
    });

    const tokens: string[] = [];
    const time = Date.now();

    return new Observable((subscriber) => {
      (async () => {
        try {
          for await (const part of stream) {
            const {
              choices: [
                {
                  delta: { content },
                },
              ],
            } = part;
            console.log(part);
            if (content) {
              tokens.push(content);
            }
            subscriber.next(content ?? '');
          }
        } catch (e) {
          console.warn('[Caught Error]', e);
        } finally {
          const generated = tokens.join('');
          // const token = gpt435Encode(generated);
          /* 保存消息 Record messages */
          await this.prisma.$transaction([
            this.prisma.chatMessage.create({
              data: {
                role: ChatMessageRole.User,
                content: input,
                userId: userId,
                chatSessionId: sessionId,
                createdAt: new Date(time),
              },
            }),
            this.prisma.chatMessage.create({
              data: {
                role: ChatMessageRole.Assistant,
                content: generated,
                userId: userId,
                modelId: modelId,
                chatSessionId: sessionId,
                createdAt: new Date(time + 1),
              },
            }),
          ]);
          subscriber.next('[DONE]');
          subscriber.complete();
        }
      })();
    });
  }
}
