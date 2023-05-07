import { defaultRedis } from "../redis";
import { Order, User } from "../types";

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

  countTotalUsers(): Promise<number> {
    return this.redis.eval(countKeysScript, [], ["user:*"]);
  }

  countTotalOrders(): Promise<number> {
    return this.redis.eval(countKeysScript, [], ["order:*"]);
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
    return this.redis.json.mget(keys, property ? `$.${property}` : "$");
  }

  async getOrdersPropertyValues<K extends keyof Order>(): Promise<[Order][]>;
  async getOrdersPropertyValues<K extends keyof Order>(
    property: K,
  ): Promise<[Order[K]][]>;

  async getOrdersPropertyValues<K extends keyof Order>(
    property?: K,
  ) {
    const keys = await this.getOrderKeys();
    return this.redis.json.mget(keys, property ? `$.${property}` : "$");
  }
}
