import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/processors/database/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getSettings(userId: number) {
    return this.prisma.chatSetting.findUnique({
      where: {
        userId,
      },
    });
  }
}
