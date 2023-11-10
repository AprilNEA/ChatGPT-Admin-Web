import { CustomPrismaService } from 'nestjs-prisma';

import { Inject, Injectable } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';

import { ExtendedPrismaClient } from '@/processors/database/prisma.extension';
import { PagerQuery } from '@/shared';

@Injectable()
export class DashboardService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  async getAnalytics() {
    const order = await this.prisma.client.order.aggregate({
      where: {
        createdAt: {
          gte: new Date(new Date().setFullYear(2023, 10, 1)),
        },
        status: OrderStatus.Paid,
      },
      _count: {
        _all: true,
      },
      _sum: {
        amount: true,
      },
    });
    return {
      user: await this.prisma.client.user.count(),
      session: await this.prisma.client.chatSession.count(),
      message: await this.prisma.client.chatMessage.count(),
      orderCount: order._count._all,
      orderAmount: order._sum.amount / 100,
    };
  }

  async listOpenaiKeys() {
    return this.prisma.client.openAIKey.findMany();
  }

  async addOpenaiKey(key: string) {
    return this.prisma.client.openAIKey.create({ data: { key } });
  }

  /* 获取所有对话 */
  async getAllChatSession({ page = 1, limit = 10 }: PagerQuery) {
    return this.prisma.client.chatSession
      .paginate({
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: {
              messages: true,
            },
          },
        },
      })
      .withPages({
        limit,
        page,
        includePageCount: true,
      });
  }

  /* 获取所有消息 */
  async getAllMessages({ page = 1, limit = 10 }: PagerQuery) {
    return this.prisma.client.chatMessage
      .paginate({
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
      .withPages({
        limit,
        page,
        includePageCount: true,
      });
  }

  /* 获取所有订单 */
  async getAllOrders({ page = 1, limit = 10 }: PagerQuery) {
    return this.prisma.client.order
      .paginate({
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          product: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
      .withPages({
        limit,
        page,
        includePageCount: true,
      });
  }

  /* 获取所有订单 */
  async getAllUsers({ page = 1, limit = 10 }: PagerQuery) {
    return this.prisma.client.user
      .paginate({
        select: {
          id: true,
          role: true,
          name: true,
          email: true,
          phone: true,
          isBlocked: true,
          password: false,
          createdAt: true,
          _count: {
            select: {
              orders: true,
              chatMessages: true,
              chatSessions: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
      .withPages({
        limit,
        page,
        includePageCount: true,
      });
  }
}
