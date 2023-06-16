export async function sendPhone(
  number: string,
  code: string
): Promise<boolean> {
  switch (process.env.SMS_SERVICE) {
    case "uni":
      return (await import("./uni")).uniSMS(number, code);
    default:
      throw new Error("SMS_SERVICE not found");
  }
}
