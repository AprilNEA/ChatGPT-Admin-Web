import { OrderDAL } from "../dal";
import { Order, OrderStatus } from "../types";

export class OrderLogic {
  constructor(private readonly dal = new OrderDAL()) {}

  async newOrder(newOrder: Order): Promise<string | null> {
    const id = this.dal.getNextId();
    const isSuccess = await this.dal.create(id, newOrder);
    if (isSuccess) return id;
    else return null;
  }

  async getOrder(orderId: string): Promise<Order | null> {
    return await this.dal.read(orderId);
  }

  async checkStatus(orderId: string): Promise<OrderStatus | null> {
    return await this.dal.readStatus(orderId);
  }

  async updateStatus(
    orderId: string,
    newStatus: OrderStatus,
  ): Promise<boolean> {
    return await this.dal.update(orderId, { status: newStatus });
  }
}
