import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/processors/database/database.service';

@Injectable()
export class UserService {
  constructor(private prisma: DatabaseService) {}

  async getInfo(userId: number) {}
  async getSettings(userId: number) {
    return this.prisma.chatSetting.findUnique({
      where: {
        userId,
      },
    });
  }
}
