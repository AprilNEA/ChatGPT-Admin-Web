import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type ISMSArgs = {
  to: string;
  code: number | string;
};

@Injectable()
export class SmsService {
  private smsConfig = this.configService.get('sms');

  constructor(private configService: ConfigService) {}

  async uni(args: ISMSArgs) {
    const result = await (
      await fetch(
        `https://uni.apistd.com/?action=sms.message.send&accessKeyId=${this.smsConfig.uni.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: args.to,
            signature: this.smsConfig.uni.signature,
            templateId: 'pub_verif_ttl',
            templateData: { code: `${args.code}`, ttl: '10' },
          }),
        },
      )
    ).json();
    return result.code === '0';
  }

  async sendCode(to: string, code: number | string) {
    switch (this.smsConfig.use?.toLowerCase()) {
      case 'uni':
        return await this.uni({ to, code });
      default:
        return false;
    }
  }
}
