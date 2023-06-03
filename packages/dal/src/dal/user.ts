import md5 from "spark-md5";
import { ServerError, serverStatus } from "@caw/types";
import client, { Prisma, type User } from "@caw/database";

import { sign, verify } from "../utils";

type userProvider = "email" | "phone" | "wechat";

export class UserDAL {
  constructor() {}

  /**
   * 根据主键获取用户
   * @param id 主键，自增主键
   */
  async getUser(id: number): Promise<User | null> {
    return client.user.findUnique({ where: { userId: id } });
  }

  /**
   * 根据唯一信息搜索用户
   * @param findType
   * @param email
   * @param phone
   * @param unionId
   */
  async findUser({
    findType,
    email,
    phone,
    unionId,
  }: {
    findType: userProvider;
    email?: string;
    phone?: string;
    unionId?: string;
  }): Promise<User | null> {
    switch (findType) {
      case "email":
        return client.user.findUnique({
          where: { email: email },
        });
      case "phone":
        return client.user.findUnique({
          where: { phone: phone },
        });
      case "wechat":
        const wechatInfo = await client.wechatInfo.findUnique({
          where: { unionId: unionId },
          include: {
            user: true,
          },
        });
        if (!wechatInfo) return null;
        return wechatInfo.user;
      default:
        throw Error("Please provide the correct way to find");
    }
  }

  /**
   * 注册
   * @param email
   * @param phone
   * @param wechatInfo
   * @param password
   * @param invitationCode
   */
  async register({
    email,
    phone,
    wechatInfo,
    password,
    invitationCode,
  }: {
    email?: string;
    phone?: string;
    wechatInfo?: {
      unionId: string;
      name: string;
      openId: string;
    };
    password?: string;
    invitationCode?: string;
  }) {
    if (email || password) {
      if (!password)
        throw Error(
          "The password must be registered at the time of using cell phone number or email"
        );
    } else {
      if (!wechatInfo) throw Error("Information must be supplied to register");
    }

    const existUser = await client.user.findMany({
      where: {
        OR: [
          {
            email: {
              equals: email,
            },
          },
          {
            phone: {
              equals: phone,
            },
          },
        ],
      },
    });

    if (wechatInfo) {
      const existWechat = await client.wechatInfo.findUnique({
        where: {
          unionId: wechatInfo.unionId,
        },
      });

      if (existUser.length > 0 || existWechat)
        throw new ServerError(
          serverStatus.alreadyExisted,
          "wechat user already exists"
        );
    }

    const userInput: Prisma.UserCreateInput = {
      email: email,
      phone: phone,
      passwordHash: password ? md5.hash(password) : undefined,
      role: {
        connectOrCreate: {
          where: {
            name: "user",
          },
          create: {
            name: "user", // TODO
          },
        },
      },
    };

    const user = await client.user.create({ data: userInput });

    /* 绑定微信账号 */
    if (wechatInfo) {
      const wechatInfoInput: Prisma.WechatInfoCreateInput = {
        unionId: wechatInfo.unionId,
        name: wechatInfo.name,
        openId: wechatInfo.openId,
        user: {
          connect: {
            userId: user.userId,
          },
        },
      };
    }

    /* Accept Invitation */
    if (invitationCode) {
      const code = await client.invitationCode.findUnique({
        where: {
          code: invitationCode,
        },
      });

      if (code) {
        /* If invitee id is exists, then make a record*/
        if (code.ownerId) {
          const invitationRecordInput: Prisma.InvitationRecordCreateInput = {
            invitee: {
              connect: {
                userId: code.ownerId,
              },
            },
            codeRaw: {
              connect: {
                code: code.code,
              },
            },
          };
          await client.invitationRecord.create({ data: invitationRecordInput });
        }
        /*
         * TODO Some invitation may have some benefit
         * */
      }
    }
    return user;
  }

  /**
   * 登录
   * @param loginType
   * @param email
   * @param phone
   * @param unionId
   * @param password
   */
  async login({
    loginType,
    email,
    phone,
    unionId,
    password,
  }: {
    loginType: userProvider;
    email?: string;
    phone?: string;
    unionId?: string;
    password: string;
  }) {
    if (email || password) {
      if (!password) throw Error("Password must be provided");
    } else {
      if (!unionId) throw Error("Please provide information");
    }
    const user = await this.findUser({
      findType: loginType,
      email,
      phone,
      unionId,
    });
    if (!user) throw Error("Unable to find User");
    if (md5.hash(password) != user.passwordHash) throw Error("");
    return sign({ email });
  }

  async getCurrentSubscription() {}

  async getAllSubscription() {}
}
