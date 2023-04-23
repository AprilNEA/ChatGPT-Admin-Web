import { AbstractDataAccessLayer } from "./abstract";
import { Plan, Subscription, subscription, User, user } from "../types";

export class UserDAL extends AbstractDataAccessLayer<User> {
  readonly schema = user;
  readonly namespace = "user:";

  protected async doCreate(email: string, data: User): Promise<void> {
    await this.redis.json.set(this.getKey(email), "$", data);
  }

  async read(email: string): Promise<User | null> {
    return (await this.redis.json.get(this.getKey(email), "$"))?.[0] ?? null;
  }

  readPassword(email: string): Promise<User["passwordHash"] | null> {
    return this.readPropertyFromRedis(email, "passwordHash");
  }

  readRole(email: string): Promise<User["role"] | null> {
    return this.readPropertyFromRedis(email, "role");
  }

  readSubscriptions(
    email: string,
  ): Promise<User["subscriptions"] | null> {
    return this.readPropertyFromRedis(email, "subscriptions");
  }

  async readPlan(
    email: string,
  ): Promise<Plan | null> {
    return (await this.redis.json
      .get(
        this.getKey(email),
        "$.subscriptions[-1].plan",
      ))
      ?.[0] ?? null;
  }

  readInvitationCodes(email: string): Promise<User["invitationCodes"] | null> {
    return this.readPropertyFromRedis(email, "invitationCodes");
  }

  readResetChances(email: string): Promise<User["resetChances"] | null> {
    return this.readPropertyFromRedis(email, "resetChances");
  }

  async incrResetChances(email: string, value: number): Promise<void> {
    await this.redis.json.numincrby(
      this.getKey(email),
      "$.resetChances",
      value,
    );
  }

  async appendSubscription(email: string, sub: Subscription): Promise<boolean> {
    return (await this.redis.json.arrappend(
      this.getKey(email),
      "$.subscriptions",
      await subscription.parseAsync(sub),
    )).every(Boolean);
  }

  async appendInvitationCode(email: string, code: string): Promise<void> {
    await this.redis.json.arrappend(
      this.getKey(email),
      "$.invitationCodes",
      JSON.stringify(code),
    );
  }

  protected doUpdate(email: string, data: Partial<User>) {
    return this.doJSONUpdate(email, data);
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
