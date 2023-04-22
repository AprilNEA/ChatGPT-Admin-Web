import { User } from "../types";
import { UserDAL } from "../dal";
import md5 from "spark-md5";

export class UserLogic {
  constructor(private readonly dal = new UserDAL()) {}

  register(
    email: string,
    password: string,
    extraData: Partial<User> = {},
  ): Promise<boolean> {
    return this.dal.create(email, {
      name: "Anonymous",
      passwordHash: md5.hash(password.trim()),
      createdAt: Date.now(),
      lastLoginAt: Date.now(),
      isBlocked: false,
      resetChances: 0,
      invitationCodes: [],
      subscriptions: [],
      role: "user",
      ...extraData,
    });
  }

  async login(email: string, password: string): Promise<boolean> {
    const passwordHash = await this.dal.readPassword(email);
    return passwordHash === md5.hash(password.trim());
  }

  update(email: string, data: Partial<User>): Promise<boolean> {
    return this.dal.update(email, data);
  }

  getRoleOf(email: string): Promise<string | null> {
    return this.dal.readRole(email);
  }
}
