import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@/processors/database/database.service';

@Injectable()
export class UserService {
  constructor(private prisma: DatabaseService) {}

  async getInfo(userId: number) {
    const user = this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        phone: true,
      },
    });
    return user;
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
