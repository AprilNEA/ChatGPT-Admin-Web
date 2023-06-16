import client, { Prisma } from "@caw/database";
import { OrderStatus, type Order, type Subscription } from "@prisma/client";

export class OrderDAL {
  constructor() {}

  static getNextId(): number {
    const timestamp: string = new Date().getTime().toString();
    const randomDigits: string = (Math.random() * 1e6)
      .toFixed(0)
      .padStart(6, "0");
    return Number(`${timestamp}${randomDigits}`);
  }

  static async newOrder({
    userId,
    planId,
    amount,
    count,
  }: {
    userId: number;
    planId: number;
    amount: number;
    count: number;
  }): Promise<Order> {
    const orderInput: Prisma.OrderCreateInput = {
      orderId: this.getNextId(),
      count: count,
      amount: amount,
      status: OrderStatus.Pending,
      plan: {
        connect: {
          planId,
        },
      },
      user: {
        connect: {
          userId,
        },
      },
    };
    return await client.order.create({ data: orderInput });
  }

  static async payOrder(
    orderId: number
  ): Promise<{ order: Order; subscription: Subscription }> {
    const newOrder = await client.order.update({
      where: {
        orderId: orderId,
      },
      data: {
        status: OrderStatus.Paid,
      },
    });
    const subscriptionInput: Prisma.SubscriptionCreateInput = {
      createdAt: new Date(),
      expiredAt: new Date(), // FIXME
      order: {
        connect: {
          orderId: orderId,
        },
      },
      plan: {
        connect: {
          planId: newOrder.planId,
        },
      },
      user: {
        connect: {
          userId: newOrder.userId,
        },
      },
    };
    return {
      order: newOrder,
      subscription: await client.subscription.create({
        data: subscriptionInput,
      }),
    };
  }
}
