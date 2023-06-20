const smsService = process.env.SMS_SERVICE;
export async function sendPhone(
  number: string,
  code: string | number,
): Promise<boolean> {
  switch (smsService) {
    case "uni":
      return (await import("./uni")).uniSMS(number, code);
    default:
      throw new Error("SMS_SERVICE not found");
  }
}
