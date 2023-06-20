import client, { Prisma } from "@caw/database";
import { OrderStatus, type Order, type Subscription } from "@prisma/client";

export class OrderDAL {
  constructor() {}

  static getNextId(): string {
    const timestamp: string = new Date().getTime().toString();
    const randomDigits: string = (Math.random() * 1e6)
      .toFixed(0)
      .padStart(6, "0");
    return `${timestamp}${randomDigits}`;
  }

  static async newOrder({
    userId,
    planId,
    priceId,
    count,
  }: {
    userId: number;
    planId: number;
    priceId: number;
    count: number;
  }): Promise<Order> {
    const price = await client.prices.findUniqueOrThrow({
      where: {
        id: priceId,
      },
    });
    const orderInput: Prisma.OrderCreateInput = {
      orderId: this.getNextId(),
      count: count,
      amount: 0.01 * count,
      status: OrderStatus.Pending,
      plan: {
        connect: {
          planId,
        },
      },
      price: {
        connect: {
          id: priceId,
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
    orderId: string
  ): Promise<{ order: Order; subscription: Subscription }> {
    const newOrder = await client.order.update({
      where: {
        orderId: orderId,
      },
      data: {
        status: OrderStatus.Paid,
      },
      include: {
        price: true,
      },
    });
    const currentDate = new Date();
    const subscriptionInput: Prisma.SubscriptionCreateInput = {
      createdAt: currentDate,
      expiredAt: new Date(
        currentDate.getTime() + newOrder.price.duration * 1000
      ),
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
