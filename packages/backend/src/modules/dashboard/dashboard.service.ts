import { CustomPrismaService } from 'nestjs-prisma';

import { Inject, Injectable } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';

import { ExtendedPrismaClient } from '@/processors/database/prisma.extension';

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
      orderAmount: order._sum.amount,
    };
  }

  async listOpenaiKeys() {
    return this.prisma.client.openAIKey.findMany();
  }

  async addOpenaiKey(key: string) {
    return this.prisma.client.openAIKey.create({ data: { key } });
  }

  async getAllChatSession({
    page = 1,
    limit = 10,
  }: {
    page?: number;
    limit?: number;
  }) {
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
}
