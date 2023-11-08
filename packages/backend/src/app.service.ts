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
    return this.prisma.announcement.findFirst({
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

  upsertAnnouncement({
    id,
    title,
    content,
  }: {
    id?: number;
    title?: string;
    content?: string;
  }) {
    if (id && (title || content)) {
      return this.prisma.announcement.update({
        where: {
          id,
        },
        data: {
          title,
          content,
        },
      });
    } else if (title && content) {
      return this.prisma.announcement.create({
        data: {
          title,
          content,
        },
      });
    }
  }

  deleteAnnouncement(id: number) {
    return this.prisma.announcement.delete({
      where: {
        id,
      },
    });
  }
}
