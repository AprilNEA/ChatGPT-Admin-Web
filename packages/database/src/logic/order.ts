import { InvitationCodeDAL, OrderDAL, UserDAL } from "../dal";
import { Order, OrderStatus } from "../types";

export class OrderLogic {
  constructor(
    private readonly invitationCodeDAL = new InvitationCodeDAL(),
    private readonly orderDAL = new OrderDAL(),
  ) {}

  /**
   * create a new order and append to invitationCode if the invitationCode is present
   * NOTE: whether the invitationCode should be added or not is not checked here.
   * You should check it using `UserDAL.readProperty(inviteeEmail, "createdAt")`
   */
  async newOrder(
    newOrder: Order,
    invitationCode?: string,
  ): Promise<string | null> {
    const id = this.orderDAL.getNextId();
    const isSuccess = await this.orderDAL.create(id, newOrder);

    if (isSuccess) {
      if (invitationCode) {
        // append order id to invitationCode if the invitationCode is present
        await this.invitationCodeDAL.appendValidOrder(invitationCode, id);
      }
      return id;
    } else return null;
  }

  async getOrder(orderId: string): Promise<Order | null> {
    return await this.orderDAL.read(orderId);
  }

  async checkStatus(orderId: string): Promise<OrderStatus | null> {
    return await this.orderDAL.readStatus(orderId);
  }

  async updateStatus(
    orderId: string,
    newStatus: OrderStatus,
  ): Promise<boolean> {
    return await this.orderDAL.update(orderId, { status: newStatus });
  }
}
