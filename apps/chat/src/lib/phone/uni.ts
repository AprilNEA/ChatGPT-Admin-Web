/**
 * This is uni-sms API : https://unisms.apistd.com/
 * We currently support Easy Mode
 */
const accessKeyId = process.env.SMS_UNI_KEY_ID!;
const signature = process.env.SMS_UNI_SIGNATURE!;

export async function uniSMS(number: string, code: string) {
  const response = await fetch(
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
    }
  );
  return response.ok;
}
