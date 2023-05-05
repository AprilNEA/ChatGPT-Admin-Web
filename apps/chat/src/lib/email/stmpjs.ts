/**
 * STMPJS only support elasticemail now
 * They say: We're really sorry, but we are only accepting SMTP servers from elasticemail.com at present
 */
interface smtpJSParams {
  Host: string;
  Username: string;
  Password: string;

  From: string;
  Subject?: string;
  Action?: string;
  To?: string;
  Body?: string;
  nocache?: number;
}

const defaultParams: smtpJSParams = {
  Host: process.env.SMTP_HOST!,
  Username: process.env.SMTP_USERNAME!,
  Password: process.env.SMTP_PASSWORD!,
  From: process.env.SMTP_USERNAME!,
  Subject: "[ChatGPT-Admin-Web] 验证码",
  Action: "Send",
};

export default async function sendEmail(to: string, code: string | number) {
  console.log({
    ...defaultParams,
    To: to,
    Body: `您的验证码为：${code}`,
    nocache: Math.floor(1e6 * Math.random() + 1),
  });
  const response = await fetch("https://smtpjs.com/v3/smtpjs.aspx?", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify({
      ...defaultParams,
      To: to,
      Body: `您的验证码为：${code}`,
      nocache: Math.floor(1e6 * Math.random() + 1),
    }),
  });

  if (response.ok) {
    console.log(await response.text());
    return true;
  } else {
    throw new Error("Network response was not ok.");
  }
}
