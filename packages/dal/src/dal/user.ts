import md5 from "spark-md5";
import { ServerError, serverStatus, DALType } from "@caw/types";
import client, { Prisma, type User } from "@caw/database";

import { accessTokenUtils } from "../utils";

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
   * @param registerCode
   * @param invitationCode
   */
  async register({
    email,
    phone,
    password,
    wechatInfo,
    registerCode,
    invitationCode,
  }: {
    email?: string;
    phone?: string;
    password?: string;
    wechatInfo?: {
      unionId: string;
      name: string;
      openId: string;
    };
    registerCode?: string;
    invitationCode?: string;
  }): Promise<DALType.UserRegister> {
    /* 当不使用微信注册时，必须输入密码
     * When not using WeChat to register, you must enter your password
     * */
    if (email || phone) {
      if (email && phone)
        throw Error("Cannot pass both email and phone at one time");
      if (!password)
        throw Error(
          "The password must be registered at the time of using cell phone number or email"
        );
      if (!registerCode)
        throw Error(
          "The code must be registered at the time of using cell phone number or email"
        );

      /* 效验验证码
       * Validation code
       * */
      const validationCode = await client.registerCode.findUniqueOrThrow({
        where: {
          register: email ?? phone,
        },
      });
      if (validationCode.code.toString() !== registerCode)
        throw new ServerError(serverStatus.wrongPassword, "Password error");
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
        include: {
          owner: {
            select: {
              name: true,
            },
          },
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
      return {
        invitation: {
          status: serverStatus.success,
          inviter: code?.owner?.name ? code.owner.name : undefined,
        },
        signedToken: await accessTokenUtils.sign(7 * 24 * (60 * 60), {
          uid: user.userId,
        }),
      };
    }

    return {
      signedToken: await accessTokenUtils.sign(7 * 24 * (60 * 60), {
        uid: user.userId,
      }),
    };
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
    /* default session duration is a week */
    return accessTokenUtils.sign(7 * 24 * (60 * 60), { uid: user.userId });
  }

  async getCurrentSubscription() {}

  async getAllSubscription() {}
}
