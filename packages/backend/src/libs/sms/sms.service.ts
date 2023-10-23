import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type ISMSArgs = {};

@Injectable()
export class SmsService {
  private smsConfig = this.configService.get('sms');

  constructor(private configService: ConfigService) {}

  async uni() {}

  async sendCode(to: string, code: number | string) {
    switch (this.smsConfig.use?.toLowerCase()) {
      case 'uni':
        return await this.uni();
      default:
        return false;
    }
  }
}
