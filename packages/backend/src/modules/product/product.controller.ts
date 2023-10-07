import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { Public } from '@/common/guards/auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Get()
  listProduct() {
    return this.productService.listProduct();
  }
}
