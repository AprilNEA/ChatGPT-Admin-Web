import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@/processors/database/database.service';

@Injectable()
export class UserService {
  constructor(private prisma: DatabaseService) {}

  async getInfo(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        role: true,
        email: true,
        phone: true,
      },
    });
    const currentTime = new Date();
    const activatedOrders = await this.prisma.order.findMany({
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
      orderBy: {
        createdAt: 'desc', // 最近的排在前面
      },
    });
    console.log(activatedOrders.length > 0);
    return {
      ...user,
      isPremium: activatedOrders.length > 0,
    };
  }

  async updateName(userId: number, name: string) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
      },
      select: {
        name: true,
      },
    });
    return user;
  }

  async getSettings(userId: number) {
    return this.prisma.chatSetting.findUnique({
      where: {
        userId,
      },
    });
  }
}
