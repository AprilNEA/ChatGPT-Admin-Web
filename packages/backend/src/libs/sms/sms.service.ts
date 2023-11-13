import { Injectable } from '@nestjs/common';

import { ConfigService } from '@/common/config';

import { ConfigType } from 'shared';

type ISMSArgs = {
  to: string;
  code: number | string;
};

@Injectable()
export class SmsService {
  private readonly smsConfig: ConfigType['sms'];

  constructor(configService: ConfigService) {
    this.smsConfig = configService.get('sms') ?? {};
  }

  async uni(args: ISMSArgs) {
    if (!this.smsConfig.uni.apiKey || !this.smsConfig.uni.signature) {
      throw new Error('SMS API Key is not set');
    }

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
