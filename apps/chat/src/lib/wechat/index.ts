import { xml2json } from "xml-js";
import { generateRandomSixDigitNumber, WechatDAL } from "@caw/dal";
import { WechatType } from "@caw/types";

export class WechatLib {
  private accessToken: string | undefined;

  constructor(accessToken?: string) {
    this.accessToken = accessToken;
  }

  static async create(
    appId?: string,
    appSecret?: string,
    accessToken?: string
  ): Promise<WechatLib> {
    appId = appId || process.env.WECHAT_APP_ID;
    appSecret = appSecret || process.env.WECHAT_APP_SECRET;
    if (!accessToken) {
      if (!appSecret || !appId) throw Error("appId and appSecret are required");
      const res = await (
        await fetch(
          `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`
        )
      ).json();
      if (res.access_token) {
        accessToken = res.access_token;
        console.log(accessToken);
      } else {
        throw Error("get access token failed");
      }
    }
    return new WechatLib(accessToken);
  }

  /**
   *
   * @param openId
   */
  async getUnionId(openId: string): Promise<string | null> {
    return (
      (
        (await (
          await fetch(
            "https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN",
            {
              method: "GET",
              body: JSON.stringify({
                access_token: this.accessToken,
                openid: openId,
                lang: "zh_CN",
              }),
            }
          )
        ).json()) as WechatType.UserInfo
      ).unionid || null
    );
  }

  /**
   * 该函数会请求调用一个场景值二维码，返回二维码的 ticket
   * 用户扫描二维码时，会产生两种推送事件：
   * 1. 用户未关注公众号
   * 2. 用户已关注公众号
   */
  async getLoginTicket(): Promise<{ ticket: string; expiredAt: string }> {
    const code = generateRandomSixDigitNumber();
    const { ticket, expire_seconds } = (await (
      await fetch(
        `https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${this.accessToken}`,
        {
          method: "POST",
          body: JSON.stringify({
            expire_seconds: 600, // 默认有效期为 10 分钟
            action_name: "QR_SCENE",
            action_info: { scene: { scene_id: code } },
          }),
        }
      )
    ).json()) as {
      ticket: string;
      expire_seconds: number;
      url: string;
    };
    const expiredAt = (
      await WechatDAL.newTicket({ code, ticket, ttl: expire_seconds })
    ).expiredAt;
    return { ticket, expiredAt };
  }

  /**
   * 该 handler 仅处理事件：
   * 1. 关注/取消关注事件。
   * 2. 扫描带参数二维码事件。当用户扫描时为注册，将被转发到关注事件。
   * @param body
   */
  static async handleEvent(body: string) {
    const {
      ToUserName: { _cdata: toUserName },
      FromUserName: { _cdata: fromUserName },
      CreateTime: { _text: createTime },
      MsgType: { _cdata: msgType },
      Event: { _cdata: event = null },
      EventKey: { _cdata: eventKey } = {},
      Ticket: { _cdata: ticket } = {},
    } = JSON.parse(xml2json(body, { compact: true, ignoreComment: true }))
      .xml as {
      ToUserName: { _cdata: string };
      FromUserName: { _cdata: string };
      CreateTime: { _text: string };
      MsgType: { _cdata: "subscribe" | "unsubscribe" | "SCAN" };
      Event: { _cdata: string };
      EventKey?: { _cdata: string };
      Ticket?: { _cdata: string };
    };

    return {
      openId: fromUserName,
      event: event,
      ticket: ticket,
    };
  }
}
