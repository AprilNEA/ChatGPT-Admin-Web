/**
 * 这个文件我花了三个小时去写, 很难想象吧
 * Web Crypto API 和 Crypto 有很大区别
 * Tencent 官方没有提供 Web Crypto API 版本的 SDK, 只有 Node.js 版本的 SDK
 * 手动实现了一版 TC3-HMAC-SHA256
 */
import { crypto } from "@edge-runtime/ponyfill";

const SecretId = process.env.TENCENT_SECRETID!;
const SecretKey = process.env.TENCENT_SECRETKEY!;

interface TmsResponse {
  Response: TmsResponseData;
  retcode: number;
  retmsg: string;
}

interface TmsResponseData {
  BizType: string;
  ContextText: string;
  DataId: string;
  DetailResults: any;
  Suggestion: string;
}

/**
 * 将utf8字符串转换为base64
 * @param utf8String
 */
function utf8ToBase64(utf8String: string) {
  const buffer = Buffer.from(utf8String, "utf-8");
  return buffer.toString("base64");
}

/**
 * sha256 根据二进制 secret 加密
 * @param message 数据
 * @param secret 二进制或十六进制字符串
 * @return 加密后的二进制
 */
async function sha256(message: string, secret: string | ArrayBuffer) {
  const encoder = new TextEncoder();
  const secretKey = await crypto.subtle.importKey(
    "raw",
    secret instanceof ArrayBuffer ? secret : encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    secretKey,
    encoder.encode(message)
  );
  // return new Uint8Array(signature);
  return signature;
}

/**
 * 获取 SHA256 哈希值
 * @param message
 * @return Uint8Array 格式的二进制数据
 */
async function getHash(message: string) {
  const encoder = new TextEncoder();
  const digestArrayBuffer = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(message)
  );
  return new Uint8Array(digestArrayBuffer);
}

/**
 * 将二进制数据转换为十六进制字符串
 * @param byteArray
 */
function toHexString(byteArray: Uint8Array) {
  return Array.from(byteArray, (byte) => {
    // 将字节转换为十六进制，并确保每个字节至少占两位
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
}

/**
 * 根据时间戳获取日期
 * @param timestamp
 */
function getDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const year = date.getUTCFullYear();
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + date.getUTCDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

export async function textSecurity(text: string) {
  // 注意 params 需要按照 key 名称字母排序
  const endpoint = "tms.tencentcloudapi.com";
  const service = "tms";
  const region = "ap-guangzhou";
  const action = "TextModeration";
  const version = "2020-12-29";
  const timestamp = Math.round(new Date().getTime() / 1000);
  //时间处理, 获取世界时间日期
  const date = getDate(timestamp);

  // ************* 步骤 1：拼接规范请求串 *************
  let payloadObj = { Content: utf8ToBase64(text), BizType: "default" };
  const payload = JSON.stringify(payloadObj);
  const hashedRequestPayload = toHexString(await getHash(payload));

  const canonicalHeaders = `content-type:application/json; charset=utf-8\nhost:${endpoint}\n`;
  const signedHeaders = "content-type;host";
  const canonicalRequest = `POST\n/\n\n${canonicalHeaders}\n${signedHeaders}\n${hashedRequestPayload}`;

  // ************* 步骤 2：拼接待签名字符串 *************
  const hashedCanonicalRequest = toHexString(await getHash(canonicalRequest));
  const credentialScope = date + "/" + service + "/" + "tc3_request";
  const stringToSign = `TC3-HMAC-SHA256\n${timestamp}\n${credentialScope}\n${hashedCanonicalRequest}`;

  console.log(stringToSign);

  // ************* 步骤 3：计算签名 *************
  const kDate = await sha256(date, "TC3" + SecretKey);
  const kService = await sha256(service, kDate);
  const kSigning = await sha256("tc3_request", kService);
  const signature = toHexString(
    new Uint8Array(await sha256(stringToSign, kSigning))
  );
  console.log(signature);

  // ************* 步骤 4：拼接 Authorization *************
  const authorization = `TC3-HMAC-SHA256 Credential=${SecretId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const data = (await (
    await fetch("https://tms.tencentcloudapi.com/", {
      method: "POST",
      headers: {
        Authorization: authorization,
        "content-type": "application/json; charset=utf-8",
        host: endpoint,
        "X-TC-Action": action,
        "X-TC-Timestamp": timestamp.toString(),
        "X-TC-Version": version,
        "X-TC-Region": region,
      },
      body: payload,
    })
  ).json()) as TmsResponse;
  console.log(data);
  return data.Response.Suggestion;
}
