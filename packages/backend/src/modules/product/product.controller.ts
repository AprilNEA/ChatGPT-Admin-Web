import { Controller, Get, Put } from '@nestjs/common';

import { Public, Role, Roles } from '@/common/guards/auth.guard';

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /* 获取所有产品 */
  @Public()
  @Get('all')
  listProduct() {
    return this.productService.listProduct();
  }

  @Public()
  @Get('models')
  async listModel() {
    return {
      success: true,
      data: await this.productService.listModel(),
    };
  }

  @Roles(Role.Admin)
  @Get('category')
  async getAllCategory() {}

  @Roles(Role.Admin)
  @Put('product')
  async updateProduct() {

  }
}
