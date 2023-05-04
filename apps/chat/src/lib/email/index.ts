/**
 * This is a program for sending emails, with the email service provided by Mailgun.
 * TODO Further processing of error reporting for emails.
 */
const api_key = process.env.EMAIL_API_KEY!;
const domain = process.env.NEXT_PUBLIC_EMAIL_DOMAIN!;

export async function sendEmail(to: string[], name: string, code: string) {
  const url = `https://api.mailgun.net/v3/${domain}/messages`;

  const formData = new URLSearchParams();
  formData.append("from", `ChatGPT <no-reply@${domain}>`);
  to.forEach((recipient) => formData.append("to", recipient));
  formData.append("subject", `Your activation code: ${code}`);
  formData.append("template", "verification_code");
  formData.append("h:X-Mailgun-Variables", JSON.stringify({ name, code }));

  const response = await fetch(url, {
    cache: "no-store",
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`api:${api_key}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  return response.ok;
}
