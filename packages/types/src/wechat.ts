export namespace WechatType {
  export type Event = "subscribe" | "unsubscribe" | "SCAN";
  // export interface Event {
  //   ToUserName: string;
  //   FromUserName: string /* OpenId */;
  //   createTime: number;
  //   MsgType: string;
  //   Event: string;
  //   EventKey?: string;
  //   Ticket?: string;
  // }

  export interface UserInfo {
    subscribe: number;
    openid: string;
    language: string;
    subscribe_time: number;
    unionid?: string;
    remark: string;
    groupid: number;
    tagid_list: number[];
    subscribe_scene: string;
    qr_scene: number;
    qr_scene_str: string;
  }
}
