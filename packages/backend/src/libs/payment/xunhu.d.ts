export interface PaymentArgs {
  version: string;
  appid: string;
  trade_order_id: string;
  total_fee: number;
  title: string;
  time: number;
  notify_url: string;
  return_url?: string;
  callback_url?: string;
  plugins?: string;
  attach?: string;
  nonce_str: string;
  type: string;
  wap_url: string;
  wap_name: string;
}

export interface PaymentResponse {
  openid: number; // 来自文档：订单id(此处有个历史遗留错误，返回名称是openid，值是orderid，一般对接不需要这个参数)
  url_qrcode: string;
  url: string;
  errcode: number;
  errmsg: string;
  hash?: string;
}

export interface CallbackBody {
  trade_order_id: string;
  trade_fee: number;
  transaction_id: number;
  open_order_id: string;
  order_title: string;
  status: string;
  plugins?: string;
  appid: string;
  time: string;
  nonce_str: string;
  hash?: string;
}
