import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@/processors/database/database.service';

@Injectable()
export class ProductService {
  constructor(private prisma: DatabaseService) {}

  /* 获取产品 */
  async listProduct() {
    return this.prisma.category.findMany({
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
    return this.prisma.model.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }
}
