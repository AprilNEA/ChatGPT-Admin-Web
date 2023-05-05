import { weightedRandom } from "../utils/common";
import { APIKeyPoolDAL } from "../dal";

export class APIKeyPoolLogic {
  constructor(private readonly dal = new APIKeyPoolDAL()) {}

  async getKey(): Promise<string | null> {
    const keys = await this.dal.read();
    if (!keys) return null;

    const selectedKey = weightedRandom(keys);
    if (!selectedKey) return null;

    queueMicrotask(async () =>
      this.dal.set({ [selectedKey]: await this.getCredit(selectedKey) })
    );

    return selectedKey;
  }

  private async getCredit(key: string): Promise<number> {
    const res = await fetch(
      "https://api.openai.com/dashboard/billing/credit_grants",
      { headers: { Authorization: `Bearer ${key}` }, cache: "no-store" },
    ).then((res) => res.json());

    return res.total_available;
  }
}
