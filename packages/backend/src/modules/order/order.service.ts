import { CustomPrismaService } from 'nestjs-prisma';

import { Inject, Injectable } from '@nestjs/common';
import { OrderStatus, OrderType } from '@prisma/client';

import { ExtendedPrismaClient } from '@/processors/database/prisma.extension';

const secondsMap = {
  month: 2592000,
  quarter: 7776000,
  year: 31104000,
} as const;

@Injectable()
export class OrderService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {}

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
    return this.prisma.client.order.findUnique({
      where: { id: orderId, userId: userId },
      include: { product: true },
    });
  }

  /* 获取指定用户订单列表 */
  async listOrder(uid?: number) {
    return this.prisma.client.order.findMany({
      // where: { userId: uid },
      include: { product: true },
    });
  }

  /* 创建订单 */
  async createOrder(userId: number, productId: number) {
    const product = await this.prisma.client.product.findUniqueOrThrow({
      where: { id: productId },
    });
    const type =
      product.duration === -1 ? OrderType.OneTime : OrderType.Subscription;
    return this.prisma.client.order.create({
      data: {
        id: this.getNextId(),
        type,
        amount: product.price, // unit is cent
        product: { connect: { id: productId } },
        user: { connect: { id: userId } },
      },
    });
  }

  /* 订单完成 */
  async finishOrder(orderId: string) {
    const order = await this.prisma.client.order.findUniqueOrThrow({
      where: { id: orderId },
      include: { product: true },
    });
    const currentTime = new Date();
    let endAt: Date = new Date(currentTime);
    switch (order.product.duration) {
      case secondsMap['month']:
        endAt.setMonth(currentTime.getMonth() + 1);
        break;
      case secondsMap['quarter']:
        endAt.setMonth(currentTime.getMonth() + 3);
        break;
      case secondsMap['year']:
        endAt.setFullYear(currentTime.getFullYear() + 1);
        break;
      default:
        endAt.setSeconds(currentTime.getSeconds() + order.product.duration);
    }

    return this.prisma.client.order.update({
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
