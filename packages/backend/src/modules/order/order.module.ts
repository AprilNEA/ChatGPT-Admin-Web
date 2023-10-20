import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseService } from '@/processors/database/database.service';
import { PaymentModule } from '@/libs/payment/payment.module';

@Module({
  imports: [PaymentModule],
  controllers: [OrderController],
  providers: [OrderService, DatabaseService],
})
export class OrderModule {}
