import { CustomPrismaService } from 'nestjs-prisma';

import { Inject, Injectable } from '@nestjs/common';

import { ExtendedPrismaClient } from '@/processors/database/prisma.extension';

@Injectable()
export class AppService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  install() {}

  getRecentAnnouncement() {
    return this.prisma.client.announcement.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  getAllAnnouncement() {
    return this.prisma.client.announcement.findMany({
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
      return this.prisma.client.announcement.update({
        where: {
          id,
        },
        data: {
          title,
          content,
        },
      });
    } else if (title && content) {
      return this.prisma.client.announcement.create({
        data: {
          title,
          content,
        },
      });
    }
  }

  deleteAnnouncement(id: number) {
    return this.prisma.client.announcement.delete({
      where: {
        id,
      },
    });
  }
}
