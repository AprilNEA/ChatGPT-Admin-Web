import md5 from 'spark-md5';
import { Injectable } from '@nestjs/common';
import { PaymentArgs, PaymentResponse, CallbackBody } from 'src/xunhu';
import { ConfigType } from '@caw/types';
import { ConfigService } from '@nestjs/config';

function urlEncodedStringToJson(encodedString: string): Record<string, string> {
  const urlParams = new URLSearchParams(encodedString);
  return Object.fromEntries(urlParams.entries());
}

/**
 * Sort the key names and link together
 * @param parameters
 * @return linked sting
 */
function sortAndSignParameters(parameters: PaymentArgs | CallbackBody): string {
  // 过滤空值参数
  const filteredParameters = Object.entries(parameters).filter(
    ([, value]) => value !== null,
  );

  // 按照参数名的ASCII码从小到大排序（字典序）
  const sortedParameters = filteredParameters.sort(([keyA], [keyB]) =>
    keyA.localeCompare(keyB),
  );

  // 使用URL键值对的格式拼接成字符串
  const stringA = sortedParameters
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return stringA;
}

@Injectable()
export class PaymentService {
  private xhConfig: ConfigType['payment']['xunhu'];

  constructor(configService: ConfigService) {
    this.xhConfig = configService.get<ConfigType['payment']>('payment').xunhu;
  }

  async xhStartPay({
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
      version: '1.1',
      appid: this.xhConfig.appId,
      trade_order_id: orderId,
      total_fee: price,
      title: title ?? 'ChatGPT-Admin-Web',
      time: Math.floor(Date.now() / 1000),
      notify_url: this.xhConfig.notifyUrl,
      return_url: this.xhConfig.returnUrl, // After the user has successfully made the payment, we will automatically redirect the user's browser to this URL.
      callback_url: this.xhConfig.returnUrl, // After the user cancels the payment, we may guide the user to redirect to this URL to make the payment again.
      // plugins: string;
      attach, // Return as is during callback. 📢We use it to confirm that the order has not been tampered with.
      nonce_str: orderId, // 1. Avoid server page caching 2. Prevent security keys from being guessed
      type: 'WAP',
      wap_url: this.xhConfig.returnUrl,
      wap_name: this.xhConfig.wapName,
    };
    const stringA = sortAndSignParameters(fetchBody);
    const hash = md5.hash(stringA + this.xhConfig.appSecret);

    const resp = await fetch('https://api.xunhupay.com/payment/do.html', {
      cache: 'no-store',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

  async xhCallback(rawBody: any) {
    /**
     * Verification callback data
     * @param req
     * @return return order id in system
     */
    const body = urlEncodedStringToJson(rawBody) as unknown as CallbackBody;
    /* == Verify Security field == */
    /*
     Currently only the appId is being validated.
     In the future, attach will also need to be validated to improve security.
     */
    if (body.appid !== this.xhConfig.appId) return null;

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
}
