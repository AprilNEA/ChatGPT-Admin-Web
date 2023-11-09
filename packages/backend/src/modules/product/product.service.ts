import { CustomPrismaService } from 'nestjs-prisma';

import { Inject, Injectable } from '@nestjs/common';

import { ExtendedPrismaClient } from '@/processors/database/prisma.extension';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

  /* 获取产品 */
  async listProduct() {
    return this.prisma.client.category.findMany({
      where: {
        isHidden: false,
      },
      include: {
        products: {
          where: {
            isHidden: false,
          },
        },
      },
    });
  }

  /* 获取模型 */
  async listModel() {
    return this.prisma.client.model.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }
}
