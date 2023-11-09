import { Module } from '@nestjs/common';

import { EmailModule } from '@/libs/email/email.module';
import { JwtModule } from '@/libs/jwt/jwt.module';
import { SmsModule } from '@/libs/sms/sms.module';
import { WechatService } from '@/modules/auth/wechat.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule, EmailModule, SmsModule],
  controllers: [AuthController],
  providers: [AuthService, WechatService],
})
export class AuthModule {}
