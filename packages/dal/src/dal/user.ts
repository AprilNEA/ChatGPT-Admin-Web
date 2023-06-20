import md5 from "spark-md5";
import { ServerError, serverStatus, DALType } from "@caw/types";
import client, { Prisma, type User } from "@caw/database";

import { accessTokenUtils } from "../utils";

export type providerType = "email" | "phone" | "wechat";

// @dalErrorCatcher
export class UserDAL {
  constructor() {}

  /**
   * 根据主键获取用户
   * @param id 主键，自增主键
   */
  static async getUser(id: number): Promise<User | null> {
    return client.user.findUnique({ where: { userId: id } });
  }

  /**
   * 根据唯一信息搜索用户
   */
  static async findUser({
    providerId,
    providerContent,
  }: {
    providerId: providerType;
    providerContent: string;
  }): Promise<User | null> {
    switch (providerId) {
      case "email":
        return client.user.findUnique({
          where: { email: providerContent },
        });
      case "phone":
        return client.user.findUnique({
          where: { phone: providerContent },
        });
      case "wechat":
        const wechatInfo = await client.wechatInfo.findUnique({
          where: { unionId: providerContent },
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
  static async register({
    email,
    phone,
    password,
    registerCode,
    invitationCode,
  }: {
    email?: string;
    phone?: string;
    password?: string;
    registerCode?: string;
    invitationCode?: string;
  }): Promise<DALType.UserRegister> {
    /* 当使用邮箱注册时，必须输入密码
     * When using Email to register, you must enter your password
     * */
    if (email || phone) {
      if (email && phone)
        throw Error("Cannot pass both email and phone at one time");
      if (email && !password)
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
      const validationCode = await client.registerCode.findUnique({
        where: {
          register: phone ? phone : email,
        },
      });
      if (validationCode?.code.toString() !== registerCode)
        throw new ServerError(serverStatus.wrongPassword, "Password error");
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

    if (existUser.length > 0) {
      if (email) {
        throw new ServerError(
          serverStatus.alreadyExisted,
          "wechat user already exists"
        );
      }
      if (phone) {
        return {
          signedToken: await accessTokenUtils.sign(7 * 24 * (60 * 60), {
            uid: existUser[0].userId,
          }),
        };
      }
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
          await client.invitationRecord.create({
            data: invitationRecordInput,
          });
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
   */
  static async login({
    providerId,
    providerContent,
  }: {
    providerId: providerType;
    providerContent: { content: string; password?: string };
  }): Promise<DALType.UserLogin> {
    if (providerId !== "wechat" && !providerContent.password) {
      throw Error("password must be provided when login by email and phone");
    }
    const user = await this.findUser({
      providerId,
      providerContent: providerContent.content,
    });
    if (!user)
      throw new ServerError(serverStatus.userNotExist, "user does not exist");
    if (
      providerId !== "wechat" &&
      md5.hash(providerContent.password ?? "") != user.passwordHash
    )
      throw new ServerError(serverStatus.wrongPassword, "password not right");
    /* default session duration is a week */
    return {
      signedToken: await accessTokenUtils.sign(7 * 24 * (60 * 60), {
        uid: user.userId,
      }),
    };
  }

  async resetChances(userId: number, value: number) {
    const user = await client.user.findUniqueOrThrow({
      where: {
        userId: userId,
      },
      select: {
        resetChances: true,
      },
    });
    if (user.resetChances + value < 0)
      throw new ServerError(
        serverStatus.notEnoughChances,
        "not enough chances"
      );
    return await client.user.update({
      where: {
        userId: userId,
      },
      data: {
        resetChances: value,
      },
    });
  }

  async getCurrentSubscription() {}

  async getAllSubscription() {}
}
