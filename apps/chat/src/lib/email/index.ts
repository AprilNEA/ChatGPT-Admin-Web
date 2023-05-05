import smtpjsEmail from "@/lib/email/stmpjs";
import mailgunEmail from "@/lib/email/mailgun";
import elasticeEmail from "@/lib/email/elasticemail";

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
