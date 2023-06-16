import client, { WechatTicket } from "@caw/database";
import { generateRandomSixDigitNumber } from "../utils";

export class WechatDAL {
  constructor() {}

  /**
   *
   */
  static async newTicket({
    code,
    ticket,
    ttl,
  }: {
    code: number;
    ticket: string;
    ttl: number;
  }): Promise<WechatTicket> {
    return await client.wechatTicket.create({
      data: {
        code,
        ticket,
        expiredAt: new Date(Date.now() + ttl * 1000),
      },
    });
  }

  /**
   * 通过微信登录
   */
  async loginByWechat({
    ticket,
    code,
    openId,
  }: {
    ticket: string;
    code: string;
    openId: string;
  }) {
    const tikcet = await client.wechatTicket.findUnique({});
  }
}
