import smtpjsEmail from "./stmpjs";
import mailgunEmail from "./mailgun";
import elasticeEmail from "./elasticemail";

const emailService = process.env.NEXT_PUBLIC_EMAIL_SERVICE;

export async function sendEmail(to: string, code: number | string) {
  switch (emailService?.toLowerCase()) {
    case "elastice":
      return elasticeEmail(to, code);
    case "mailgun":
      return mailgunEmail([to], "", code.toString());
    case "smtpjs":
      return smtpjsEmail(to, code);
    default:
      return true;
  }
}
