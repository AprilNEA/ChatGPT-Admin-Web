/**
 * This is uni-sms API : https://unisms.apistd.com/
 * We currently support Easy Mode
 */
const accessKeyId = process.env.SMS_UNI_KEY_ID!;
const signature = process.env.SMS_UNI_SIGNATURE!;

interface UniResponse {
  code: string;
  message: string;
  data?: {
    currency: string;
    recipients: number;
    messageCount: number;
    totalAmount: string;
    payAmount: string;
    virtualAmount: string;
    message: {
      id: string;
      to: string;
      regionCode: string;
      countryCode: string;
      messageCount: number;
      status: string;
      upstream: string;
      price: string;
    };
  };
}

export async function uniSMS(number: string, code: string | number) {
  const response = (await (
    await fetch(
      `https://uni.apistd.com?action=sms.message.send&accessKeyId=${accessKeyId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: number /* Must be 4-6 numbers TODO Make a validation here */,
          signature,
          templateId: "pub_verif_register_ttl",
          templateData: {
            code,
            ttl: "5" /* The unit is minutes*/,
          },
        }),
      },
    )
  ).json()) as UniResponse;
  if (response.code !== "0") return false;
  //   throw
  return true;
}
