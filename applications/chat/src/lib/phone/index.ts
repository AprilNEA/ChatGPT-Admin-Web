const SMS_ACCESS_KEY = process.env.SMS_ACCESS_KEY_ID!;

export async function sendPhone(number: string, code: string) {
  const response = await fetch(
    `https://uni.apistd.com?action=sms.message.send&accessKeyId=${SMS_ACCESS_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: number,
        signature: "lmo.best",
        templateId: "pub_verif_register_ttl",
        templateData: {
          code,
          ttl: "5",
        },
      }),
    }
  );
  return response.ok;
}
