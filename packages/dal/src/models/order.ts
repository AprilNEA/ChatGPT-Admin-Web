import { redis } from '../redis/client';
import { Model } from './typing';
import * as crypto from 'crypto';
import OrderStatus = Model.OrderStatus;

export class OrderDAL {
  private static getNextId(): string {
    const timestamp: string = new Date().getTime().toString();
    const randomDigits: string = (Math.random() * 1e6)
      .toFixed(0)
      .padStart(6, '0');
    return `${timestamp}${randomDigits}`;
  }

  private static getKey(orderId: string) {
    return `order:${orderId}`;
  }

  /**
   * 创建一个新的订单
   * @return 成功返回订单号, 失败返回 -1
   */
  static async newOrder(newOrder: Model.Order): Promise<string | null> {
    const id = this.getNextId();
    const isSuccess =
      (await redis.json.set(this.getKey(id), '$', newOrder)) === 'OK';
    if (isSuccess) return id;
    else return null;
  }

  /**
   * 返回整个订单
   */
  static async getOrder(orderId: string): Promise<Model.Order | null> {
    return (await redis.json.get(this.getKey(orderId), '$'))?.[0] ?? null;
  }

  /**
   * 检查订单的状态, 直接返回 OrderStatus, 无此订单则返回 null
   */
  static async checkStatus(orderId: string): Promise<OrderStatus | null> {
    return (
      (await redis.json.get(this.getKey(orderId), '$.status'))?.[0] ?? null
    );
  }

  /**
   * 更新订单状态,
   * @param orderId
   * @param newStatus
   */
  static async updateStatus(
    orderId: string,
    newStatus: OrderStatus
  ): Promise<boolean> {
    return (
      (await redis.json.set(
        this.getKey(orderId),
        '$.status',
        JSON.stringify(newStatus)
      )) === 'OK'
    );
  }
}
