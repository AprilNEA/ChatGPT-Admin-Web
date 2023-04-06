import { fetch } from "@edge-runtime/ponyfill";
import md5 from "spark-md5";
import {store} from "next/dist/build/output/store";

const appId = process.env.PAY_APPID!;
const appSecret = process.env.PAY_APPSECRET!;

interface PaymentArgs {
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

interface PaymentResponse {
  oderid: number;
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
  hash: string;
}

function sortAndSignParameters(parameters: PaymentArgs): string {
  // 过滤空值参数
  const filteredParameters = Object.entries(parameters).filter(
    ([, value]) => value !== null
  );

  // 按照参数名的ASCII码从小到大排序（字典序）
  const sortedParameters = filteredParameters.sort(([keyA], [keyB]) =>
    keyA.localeCompare(keyB)
  );

  // 使用URL键值对的格式拼接成字符串
  const stringA = sortedParameters
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return stringA;
}

export async function startPay(orderId: string, price: number, email:string) {
  const fetchBody: PaymentArgs = {
    version: "1.1",
    appid: appId,
    trade_order_id: orderId,
    total_fee: price,
    title: "仁爱路111号",
    time: Math.floor(Date.now() / 1000),
    notify_url: "https://cn.lmo.best/api/user/pay/callback",
    return_url: "https://lmo.best",
    // callback_url: string;
    // plugins: string;
    // attach: email, // 我们将 Email 附加在其中
    nonce_str: "123",
    type: "WAP",
    wap_url: "https://lmo.best",
    wap_name: "仁爱路",
  };
  const stringA = sortAndSignParameters(fetchBody);
  const hash = md5.hash(stringA + appSecret);

  const resp = (await (
    await fetch("https://api.xunhupay.com/payment/do.html", {
      cache: 'no-store',
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...fetchBody,
        hash,
      }),
    })
  ).json()) as PaymentResponse;
  return resp;
}

export function handleCallback(body:CallbackBody) {

}
