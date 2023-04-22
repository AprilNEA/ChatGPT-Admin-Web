import { AbstractDataAccessLayer } from "./abstract";
import { User, user } from "../types";

export class UserDAL extends AbstractDataAccessLayer<User> {
  readonly schema = user;
  readonly namespace = "user:";

  protected async doCreate(email: string, data: User): Promise<void> {
    await this.redis.json.set(email, "$", data);
  }

  protected async doRead(email: string): Promise<User> {
    return (await this.redis.json.get(email, "$"))[0];
  }

  protected async doUpdate(email: string, data: Partial<User>): Promise<void> {
    await Object.entries(data).reduce(
      (pipe, [key, value]) => pipe.json.set(email, `$.${key}`, value),
      this.redis.pipeline(),
    ).exec();
  }

  async delete(id: string): Promise<boolean> {
    return await this.redis.del(this.getKey(id)) > 0;
  }

  async exists(id: string): Promise<boolean> {
    return (await this.redis.exists(this.getKey(id))) > 0;
  }

  async listValues(cursor = 0): Promise<[number, User[]]> {
    const [newCursor, keys] = await this.listKeys(cursor);
    const values: [User][] = await this.redis.json.mget(keys, "$");
    const users = values.map((value) => value[0]);
    return [newCursor, users];
  }
}
