import { AbstractDataAccessLayer } from "./abstract";
import { User, user } from "../types";

export class UserDAL extends AbstractDataAccessLayer<User> {
  readonly schema = user;
  readonly namespace = "user:";

  protected async doCreate(email: string, data: User): Promise<void> {
    await this.redis.json.set(email, "$", data);
  }

  async read(email: string): Promise<User | null> {
    return (await this.redis.json.get(email, "$"))?.[0] ?? null;
  }

  async readPassword(email: string): Promise<string | null> {
    return (await this.redis.json.get(email, "$.passwordHash"))?.[0] ?? null;
  }

  async readRole(email: string): Promise<string | null> {
    return (await this.redis.json.get(email, "$.role"))?.[0] ?? null;
  }

  protected async doUpdate(email: string, data: Partial<User>): Promise<void> {
    await Object.entries(data).reduce(
      (pipe, [key, value]) => pipe.json.set(email, `$.${key}`, value),
      this.redis.pipeline(),
    ).exec();
  }

  async delete(email: string): Promise<boolean> {
    return await this.redis.del(this.getKey(email)) > 0;
  }

  async exists(email: string): Promise<boolean> {
    return (await this.redis.exists(this.getKey(email))) > 0;
  }

  async listValues(cursor = 0): Promise<[number, User[]]> {
    const [newCursor, keys] = await this.listKeys(cursor);
    const values: [User][] = await this.redis.json.mget(keys, "$");
    const parsingUsers = values.map((value) =>
      this.schema.parseAsync(value[0])
    );
    return [newCursor, await Promise.all(parsingUsers)];
  }
}
