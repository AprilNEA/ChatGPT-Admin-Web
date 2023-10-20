import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/processors/database/database.service';

@Injectable()
export class ProductService {
  constructor(private prisma: DatabaseService) {}

  async listProduct() {
    return this.prisma.category.findMany({
      include: {
        products: {
          where: {
            isHidden: false,
          },
        },
      },
    });
  }
}
