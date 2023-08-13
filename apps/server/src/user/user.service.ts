import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getSettings(userId: string) {
    // return this.prisma.chatSetting.findUnique({});
  }
}
