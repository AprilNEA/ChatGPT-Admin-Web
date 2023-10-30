import { Module } from '@nestjs/common';

import { DatabaseService } from '@/processors/database/database.service';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, DatabaseService],
})
export class ProductModule {}
