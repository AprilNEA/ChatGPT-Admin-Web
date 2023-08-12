import { User } from "../types";
import { UserDAL } from "../dal";
import md5 from "spark-md5";

export class UserLogic {
  constructor(private readonly dal = new UserDAL()) {}

  /**
   * @returns true if the user was created, false if the user already exists
   */
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

  /**
   * @returns true if the password is correct, false if the password is incorrect or the user does not exist
   */
  async login(email: string, password: string): Promise<boolean> {
    const passwordHash = await this.dal.readPassword(email);
    const success = passwordHash === md5.hash(password.trim());

    if (success) await this.dal.update(email, { lastLoginAt: Date.now() });

    return success;
  }

  /**
   * @returns true if the user was updated, false if the user does not exist
   */
  update(email: string, data: Partial<User>): Promise<boolean> {
    return this.dal.update(email, data);
  }

  /**
   * @returns the role of the user, or null if the user does not exist
   */
  getRoleOf(email: string) {
    return this.dal.readRole(email);
  }

  /**
   * @returns the plan of the user, or null if the user does not exist
   */
  getPlanOf(email: string) {
    return this.dal.readPlan(email);
  }

  /**
   * @returns the invitation codes of the user, or null if the user does not exist
   */
  getInvitationCodesOf(email: string) {
    return this.dal.readInvitationCodes(email);
  }

  /**
   * @returns the reset chances of the user, or null if the user does not exist
   */
  getResetChancesOf(email: string) {
    return this.dal.readResetChances(email);
  }
}
