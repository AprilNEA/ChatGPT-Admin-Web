import { fetch } from "@edge-runtime/ponyfill";
import md5 from "spark-md5";
import { type NextRequest } from "next/server";

const appId = process.env.XUNHU_PAY_APPID!;
const appSecret = process.env.XUNHU_PAY_APPSECRET!;
const wapName = process.env.PAY_WAPNAME ?? "店铺名称";

const domain = process.env.DOMAIN;
const callbackDomain = process.env.callBackDoamin ?? domain;

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

/**
 * Sort the key names and link together
 * @param parameters
 * @return linked sting
 */
function sortAndSignParameters(parameters: PaymentArgs | CallbackBody): string {
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

/**
 * Request a order
 * @param orderId internal order id
 * @param price the price need to be paid
 * @param attach encrypted field being transmitted.
 * @param title payment title
 */
export async function startPay({
  orderId,
  price,
  attach,
  title,
}: {
  orderId: string;
  price: number;
  attach: string;
  title?: string;
}) {
  const fetchBody: PaymentArgs = {
    version: "1.1",
    appid: appId,
    trade_order_id: orderId,
    total_fee: price,
    title: title ?? "ChatGPT-Admin-Web",
    time: Math.floor(Date.now() / 1000),
    notify_url: `${callbackDomain}/api/callback`,
    return_url: `${domain}`, // After the user has successfully made the payment, we will automatically redirect the user's browser to this URL.
    callback_url: `${domain}`, // After the user cancels the payment, we may guide the user to redirect to this URL to make the payment again.
    // plugins: string;
    attach, // Return as is during callback. 📢We use it to confirm that the order has not been tampered with.
    nonce_str: orderId, // 1. Avoid server page caching 2. Prevent security keys from being guessed
    type: "WAP",
    wap_url: `${domain}`,
    wap_name: wapName,
  };
  const stringA = sortAndSignParameters(fetchBody);
  const hash = md5.hash(stringA + appSecret);

  const resp = await fetch("https://api.xunhupay.com/payment/do.html", {
    cache: "no-store",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...fetchBody,
      hash,
    }),
  });
  try {
    return (await resp.json()) as PaymentResponse;
  } catch (e) {
    return null;
  }
}

function urlEncodedStringToJson(encodedString: string): Record<string, string> {
  const urlParams = new URLSearchParams(encodedString);
  return Object.fromEntries(urlParams.entries());
}

/**
 * Verification callback data
 * @param req
 * @return return order id in system
 */
export async function handleCallback(req: NextRequest) {
  const body = urlEncodedStringToJson(
    await req.text()
  ) as unknown as CallbackBody;
  /* == Verify Security field == */
  /*
   Currently only the appId is being validated.
   In the future, attach will also need to be validated to improve security.
   */
  if (body.appid !== appId) return null;

  /* == Verify Signature == */
  // const trueHash = body.hash!
  // delete body.hash /* remove hash before sign */
  //
  // const stringA = sortAndSignParameters(body);
  // const hash = md5.hash(stringA + appSecret);
  //
  // if (hash !== trueHash)
  //   return null
  /* ====================== */

  return body.trade_order_id;
}
