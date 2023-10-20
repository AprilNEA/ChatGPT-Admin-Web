import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/processors/database/database.service';
import { OrderStatus, OrderType } from '@prisma/client';
import {
  monthDuration,
  quarterDuration,
  yearDuration,
} from '@/processors/database/database.service';

@Injectable()
export class OrderService {
  constructor(private prisma: DatabaseService) {}

  getNextId(): string {
    const timestamp: string = new Date().getTime().toString();
    const randomDigits: string = (Math.random() * 1e6)
      .toFixed(0)
      .padStart(6, '0');
    return `${timestamp}${randomDigits}`;
  }

  async findOrder(oid: string, uid?: number) {
    return this.prisma.order.findUnique({
      where: { id: oid, userId: uid },
      include: { product: true },
    });
  }

  async listOrder(uid?: number) {
    return this.prisma.order.findMany({
      where: { userId: uid },
      include: { product: true },
    });
  }

  async createOrder(uid: number, pid: number) {
    const product = await this.prisma.product.findUniqueOrThrow({
      where: { id: pid },
    });
    const type =
      product.duration === -1 ? OrderType.OneTime : OrderType.Subscription;
    return this.prisma.order.create({
      data: {
        id: this.getNextId(),
        type,
        amount: product.price,
        product: { connect: { id: pid } },
        user: { connect: { id: uid } },
      },
    });
  }

  async finishOrder(oid: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: oid },
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
      where: { id: oid },
      data: {
        status: OrderStatus.Paid,
        startAt: currentTime,
        endAt,
        isCurrent: true,
      },
    });
  }
}
