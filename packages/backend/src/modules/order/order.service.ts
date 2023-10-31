import { Injectable } from '@nestjs/common';
import { OrderStatus, OrderType } from '@prisma/client';

import { DatabaseService } from '@/processors/database/database.service';
import {
  monthDuration,
  quarterDuration,
  yearDuration,
} from '@/processors/database/database.service';

@Injectable()
export class OrderService {
  constructor(private prisma: DatabaseService) {}

  /* 获取订单Id */
  getNextId(): string {
    const timestamp: string = new Date().getTime().toString();
    const randomDigits: string = (Math.random() * 1e6)
      .toFixed(0)
      .padStart(6, '0');
    return `${timestamp}${randomDigits}`;
  }

  /* 获取指定订单，可选userId过滤 */
  async findOrder(orderId: string, userId?: number) {
    return this.prisma.order.findUnique({
      where: { id: orderId, userId: userId },
      include: { product: true },
    });
  }

  /* 获取指定用户订单列表 */
  async listOrder(uid?: number) {
    return this.prisma.order.findMany({
      // where: { userId: uid },
      include: { product: true },
    });
  }

  /* 创建订单 */
  async createOrder(userId: number, productId: number) {
    const product = await this.prisma.product.findUniqueOrThrow({
      where: { id: productId },
    });
    const type =
      product.duration === -1 ? OrderType.OneTime : OrderType.Subscription;
    return this.prisma.order.create({
      data: {
        id: this.getNextId(),
        type,
        amount: product.price / 100,
        product: { connect: { id: productId } },
        user: { connect: { id: userId } },
      },
    });
  }

  /* 订单完成 */
  async finishOrder(orderId: string) {
    const order = await this.prisma.order.findUniqueOrThrow({
      where: { id: orderId },
      include: { product: true },
    });
    const currentTime = new Date();
    let endAt: Date = new Date(currentTime);
    switch (order.product.duration) {
      case monthDuration:
        endAt.setMonth(currentTime.getMonth() + 1);
        break;
      case quarterDuration:
        endAt.setMonth(currentTime.getMonth() + 3);
        break;
      case yearDuration:
        endAt.setFullYear(currentTime.getFullYear() + 1);
        break;
      default:
        endAt.setSeconds(currentTime.getSeconds() + order.product.duration);
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.Paid,
        startAt: currentTime,
        endAt,
        isCurrent: true,
      },
    });
  }
}
