import { Module } from '@nestjs/common';

import { PaymentModule } from '@/libs/payment/payment.module';
import { DatabaseService } from '@/processors/database/database.service';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [PaymentModule],
  controllers: [OrderController],
  providers: [OrderService, DatabaseService],
})
export class OrderModule {}
