import { defaultRedis } from '../redis';
import { Order, User } from '../types';

const countKeysScript = `
local pattern = ARGV[1]
local cursor = "0"
local count = 0

repeat
    local result = redis.call('SCAN', cursor, 'MATCH', pattern, "COUNT", 1000)
    cursor = result[1]
    count = count + #result[2]
until cursor == "0"

return count
`;

const scanKeysScript = `
local pattern = KEYS[1]
local cursor = '0'
local keys = {}

repeat
    local result = redis.call('SCAN', cursor, 'MATCH', pattern, 'COUNT', 1000)
    cursor = result[1]
    for i, key in ipairs(result[2]) do
        table.insert(keys, key)
    end
until cursor == '0'

return keys
`;

export class AnalysisDAL {
  constructor(private readonly redis = defaultRedis) {}

  /**
   * Count the total number of users.
   */
  countTotalUsers(): Promise<number> {
    return this.redis.eval(countKeysScript, [], ['user:*']);
  }

  /**
   * Count the total number of orders.
   */
  countTotalOrders(): Promise<number> {
    return this.redis.eval(countKeysScript, [], ['order:*']);
  }

  getUserKeys(): Promise<string[]> {
    return this.redis.eval(scanKeysScript, ["user:*"], []);
  }

  getOrderKeys(): Promise<string[]> {
    return this.redis.eval(scanKeysScript, ["order:*"], []);
  }

  async getUsersPropertyValues<K extends keyof User>(): Promise<[User][]>;
  async getUsersPropertyValues<K extends keyof User>(
    property: K,
  ): Promise<[User[K]][]>;

  async getUsersPropertyValues<K extends keyof User>(
    property?: K,
  ) {
    const keys = await this.getUserKeys();
    return this.getJSONValues(keys, property ? `$.${property}` : "$");
  }

  async getOrdersPropertyValues<K extends keyof Order>(): Promise<[Order][]>;
  async getOrdersPropertyValues<K extends keyof Order>(
    property: K,
  ): Promise<[Order[K]][]>;

  async getOrdersPropertyValues<K extends keyof Order>(
    property?: K,
  ) {
    const keys = await this.getOrderKeys();
    return this.getJSONValues(keys, property ? `$.${property}` : "$");
  }

  private async getJSONValues<T>(keys: string[], path = "$"): Promise<[T][]> {
    // partition keys to 2500 per group
    const groups: string[][] = [];
    for (let i = 0; i < keys.length; i += 2500) {
      groups.push(keys.slice(i, i + 2500));
    }

    return (await Promise.all(
      groups.map((group) => this.redis.json.mget(group, path)),
    )).flat();
  }
}
