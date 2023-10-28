import { Controller, Get } from '@nestjs/common';

import { Public } from '@/common/guards/auth.guard';

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get('all')
  listProduct() {
    return this.productService.listProduct();
  }
}
