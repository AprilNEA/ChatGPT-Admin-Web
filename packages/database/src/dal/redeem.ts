import { Redeem, redeem } from "../types";
import { AbstractDataAccessLayer } from "./abstract";

export class RedeemDAL extends AbstractDataAccessLayer<Redeem> {
  schema = redeem;
  namespace: `${string}:` = `redeem:`;

  protected async doCreate(id: string, data: Redeem): Promise<void> {
    await this.redis.json.set(this.getKey(id), "$", JSON.stringify(data));
  }

  protected doUpdate(id: string, data: Partial<Redeem>): Promise<void> {
    return this.doJSONUpdate(id, data);
  }

  async read(code: string): Promise<Redeem | null> {
    return (await this.redis.json.get(this.getKey(code), "$"))?.[0] ?? null;
  }
}
