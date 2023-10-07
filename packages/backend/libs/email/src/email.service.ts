import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mailgunEmail from './mailgun';
import elasticeEmail from './elasticemail';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}

  async sendCode(to: string, code: number | string) {
    switch (this.configService.get('email').use?.toLowerCase()) {
      case 'elastice':
        return elasticeEmail(to, code);
      case 'mailgun':
        return mailgunEmail([to], '', code.toString());
      default:
        return true;
    }
  }
}
