import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from '@/processors/database/prisma.service';
import { PaymentModule } from '@libs/payment';

@Module({
  imports: [PaymentModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
})
export class OrderModule {}
