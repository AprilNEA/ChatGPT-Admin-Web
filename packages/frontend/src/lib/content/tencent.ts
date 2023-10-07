/**
 * There is a big difference between Web Crypto API and Crypto.
 * Tencent official does not provide an SDK for the Web Crypto API version, only for the Node.js version.
 * TC3-HMAC-SHA256 compatible with Edge Runtime has been manually implemented here.
 * Author: AprilNEA<github@sku.moe>
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
 * Convert UTF-8 string to base64.
 * @param utf8String
 */
function utf8ToBase64(utf8String: string) {
  const buffer = Buffer.from(utf8String, "utf-8");
  return buffer.toString("base64");
}

/**
 * sha256 encrypts based on binary secret.
 * @param message: data
 * @param secret: binary or hexadecimal string
 * @return: encrypted binary
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
 * Get SHA256 hash value
 * @param message
 * @return Binary data in Uint8Array format
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
 * Convert binary data to hexadecimal string.
 * @param byteArray
 */
function toHexString(byteArray: Uint8Array) {
  return Array.from(byteArray, (byte) => {
    // 将字节转换为十六进制，并确保每个字节至少占两位
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
}

/**
 * Get the date based on a timestamp.
 * @param timestamp
 */
function getDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const year = date.getUTCFullYear();
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + date.getUTCDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

/**
 * Tencent text security
 * Document:
 * @param text
 */
export async function tencentTextSecurity(text: string) {
  // Please note that the `params` need to be sorted alphabetically by the key name.
  const endpoint = "tms.tencentcloudapi.com";
  const service = "tms";
  const region = "ap-guangzhou";
  const action = "TextModeration";
  const version = "2020-12-29";
  const timestamp = Math.round(new Date().getTime() / 1000);
  // Time processing, obtain world time and date.
  const date = getDate(timestamp);

  // ************* Step 1: Concatenate the canonical request string. *************
  let payloadObj = { Content: utf8ToBase64(text), BizType: "default" };
  const payload = JSON.stringify(payloadObj);
  const hashedRequestPayload = toHexString(await getHash(payload));

  const canonicalHeaders = `content-type:application/json; charset=utf-8\nhost:${endpoint}\n`;
  const signedHeaders = "content-type;host";
  const canonicalRequest = `POST\n/\n\n${canonicalHeaders}\n${signedHeaders}\n${hashedRequestPayload}`;

  // ************* Step 2: Concatenate the unsigned string. *************
  const hashedCanonicalRequest = toHexString(await getHash(canonicalRequest));
  const credentialScope = date + "/" + service + "/" + "tc3_request";
  const stringToSign = `TC3-HMAC-SHA256\n${timestamp}\n${credentialScope}\n${hashedCanonicalRequest}`;

  // ************* Step 3: Calculate the signature. *************
  const kDate = await sha256(date, "TC3" + SecretKey);
  const kService = await sha256(service, kDate);
  const kSigning = await sha256("tc3_request", kService);
  const signature = toHexString(
    new Uint8Array(await sha256(stringToSign, kSigning))
  );

  // ************* Step 4: Splicing Authorization *************
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

  return data.Response.Suggestion;
}
