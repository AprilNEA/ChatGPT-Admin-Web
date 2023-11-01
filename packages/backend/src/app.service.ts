import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@/processors/database/database.service';

@Injectable()
export class AppService {
  constructor(private prisma: DatabaseService) {}

  getHello(): string {
    return 'Hello World!';
  }

  install() {}

  getRecentAnnouncement() {
    return this.prisma.announcement.findMany({
      take: 1,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  getAllAnnouncement() {
    return this.prisma.announcement.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
