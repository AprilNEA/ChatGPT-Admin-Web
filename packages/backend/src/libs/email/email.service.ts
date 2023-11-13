import { Injectable } from '@nestjs/common';

import { ConfigService } from '@/common/config';

import { ConfigType } from 'shared';

type IEmailArgs = {
  from: string;
  to: string[];
  subject: string;
  content: string;
};

@Injectable()
export class EmailService {
  private readonly emailConfig: ConfigType['email'];

  constructor(configService: ConfigService) {
    this.emailConfig = configService.get('email');
  }

  /* Resend email */
  async #resend(args: IEmailArgs) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.emailConfig.resend.apiKey}`,
      },
      body: JSON.stringify({
        from: args.from,
        to: args.to,
        subject: args.subject,
        html: args.content,
      }),
    });
    return res.ok;
  }

  /* Elastic Email sender */
  async #elastic(args: IEmailArgs) {
    const params = {
      apikey: this.emailConfig.elastic.apiKey,
      from: args.from,
      to: args.to,
      subject: args.subject,
      bodyHtml: args.content,
    };

    const formData = new FormData();
    for (const key in params) {
      // @ts-ignore
      formData.append(key, params[key]);
    }

    const response = await fetch('https://api.elasticemail.com/v2/email/send', {
      method: 'POST',
      body: formData,
    });

    return response.ok;
  }

  /**
   * This is a program for sending emails, with the email service provided by Mailgun.
   * Need further processing of error reporting for emails.
   */
  async #mailgun(args: IEmailArgs) {
    const url = `https://api.mailgun.net/v3/${this.emailConfig.mailgun.domain}/messages`;

    const formData = new URLSearchParams();
    formData.append('from', args.from);
    args.to.forEach((recipient) => formData.append('to', recipient));
    formData.append('subject', args.subject);
    formData.append('template', 'verification_code');
    // formData.append('h:X-Mailgun-Variables', JSON.stringify({ name, code }));

    const response = await fetch(url, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(
          `api:${this.emailConfig.mailgun.apiKey}`,
        )}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    return response.ok;
  }

  async sendCode(to: string, code: number | string) {
    const args = {
      from: this.emailConfig.sender || `no-reply@${this.emailConfig.domain}`,
      to: [to],
      subject: `你的激活码是 ${code}`,
      content: `你的激活码是 ${code}`,
    };

    switch (this.emailConfig.use?.toLowerCase()) {
      case 'resend':
        return this.#resend(args);
      case 'elastic':
        return this.#elastic(args);
      case 'mailgun':
        return this.#mailgun(args);
      case undefined:
      default:
        return false;
    }
  }
}
