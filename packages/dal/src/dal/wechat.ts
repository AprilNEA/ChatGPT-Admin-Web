import client, { WechatTicket } from "@caw/database";
import { accessTokenUtils, generateRandomSixDigitNumber } from "../utils";
import { Prisma } from "@prisma/client";
import { ServerError, serverStatus } from "@caw/types";
import md5 from "spark-md5";

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
        expiredAt: new Date(Date.now() + ttl * 1000 * 1000),
      },
    });
  }

  /**
   *
   */
  static async loginTicket(token: string) {
    const ticket = await client.wechatTicket.findUnique({
      where: {
        ticket: token,
      },
    });
    if (!ticket)
      throw new ServerError(serverStatus.invalidTicket, "invalid ticket");
    if (!ticket.openId)
      throw new ServerError(serverStatus.unScannedTicket, "not scanned");

    const user = await client.wechatInfo.findUnique({
      where: {
        openId: ticket.openId,
      },
    });
    if (!user)
      throw new ServerError(serverStatus.userNotExist, "user does not exist");
    return {
      signedToken: await accessTokenUtils.sign(7 * 24 * (60 * 60), {
        uid: user.userId,
      }),
    };
  }

  /**
   * 注册微信
   */
  static async registerByWechat({
    unionId,
    openId,
    ticket,
  }: {
    unionId: string | null;
    openId: string;
    ticket: string;
  }) {
    const existUser = await client.wechatInfo.findMany({
      where: {
        OR: [
          {
            unionId: unionId,
          },
          {
            openId: openId,
          },
        ],
      },
    });
    /* 如果用户不存在则先注册 */
    if (existUser.length === 0) {
      const userInput: Prisma.UserCreateInput = {
        role: {
          connectOrCreate: {
            where: {
              name: "user",
            },
            create: {
              name: "user",
            },
          },
        },
        wechat: {
          connectOrCreate: {
            where: {
              ...(unionId ? { unionId: unionId } : { openId: openId }),
            },
            create: {
              unionId: unionId,
              openId: openId,
            },
          },
        },
      };
      await client.user.create({ data: userInput });
    }

    return await client.wechatTicket.update({
      where: {
        ticket: ticket,
      },
      data: {
        openId: openId,
      },
    });
  }

  /**
   * 通过微信登录
   */
  static async loginByWechat({
    ticket,
    openId,
  }: {
    ticket: string;
    openId: string;
  }) {
    await client.wechatTicket.update({
      where: {
        ticket: ticket,
      },
      data: {
        openId: openId,
      },
    });
  }
}
