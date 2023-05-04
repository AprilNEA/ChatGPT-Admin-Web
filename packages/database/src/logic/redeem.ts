import { Redeem } from "../types";
import { RedeemDAL } from "../dal";

export class RedeemLogic {
  constructor(private dal = new RedeemDAL()) {}

  async newCode(plan: string, count: number): Promise<string> {
    const code = crypto.randomUUID();

    await this.dal.create(code, {
      createdAt: Date.now(),
      plan,
      count,
    });

    return code;
  }

  async activateCode(email: string, code: string): Promise<Redeem | null> {
    const redeem = await this.dal.read(code);
    if (redeem?.activated) {
      return null;
    }

    const updatedPart = {
      activated: {
        byEmail: email,
        at: Date.now(),
      },
    };

    return await this.dal.update(code, updatedPart)
      ? { ...redeem, ...updatedPart } as Redeem
      : null;
  }
}
