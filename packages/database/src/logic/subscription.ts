import { UserDAL } from "src/dal";
import { Plan, Subscription } from "../types";

export class SubscriptionLogic {
  constructor(private readonly dal = new UserDAL()) {}

  /**
   * @returns the plan of the user, or "free" if the user does not exist
   */
  async getPlanOf(email: string): Promise<Plan> {
    return await this.dal.readPlan(email) ?? "free";
  }

  /**
   * @returns true if subscription was appended, false if the user does not exist
   */
  async append(email: string, sub: Subscription): Promise<boolean> {
    return this.dal.appendSubscription(email, sub);
  }
}
