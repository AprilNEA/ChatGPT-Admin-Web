import { AnalysisDAL } from "../dal";
import { OrderStatus } from "../types";

export class AnalysisLogic {
  constructor(private readonly dal = new AnalysisDAL()) {}

  countTotalUsers(): Promise<number> {
    return this.dal.countTotalUsers();
  }

  countTotalOrders(): Promise<number> {
    return this.dal.countTotalOrders();
  }

  async countNewUsersCreatedSince(timestamp: number): Promise<number> {
    const creationDates = await this.dal.getUsersPropertyValues("createdAt");
    const count = creationDates.filter(([date]) => date > timestamp).length;
    return count;
  }

  async countNewOrdersCreatedSince(timestamp: number): Promise<number> {
    const creationDates = await this.dal.getOrdersPropertyValues("createdAt");
    const count = creationDates.filter(([t]) => t > timestamp).length;
    return count;
  }

  async countTotalOrdersWhoseStatusIs(status: OrderStatus): Promise<number> {
    const orders = await this.dal.getOrdersPropertyValues("status");
    const count = orders.filter(([s]) => s === status).length;
    return count;
  }

  /** count all users who has at least one related order even if unpaid or refund */
  async countTotalUsersHavingOrder(): Promise<number> {
    const emails = await this.dal.getOrdersPropertyValues("email");
    const count = new Set(emails.map(([e]) => e)).size;
    return count;
  }
}
