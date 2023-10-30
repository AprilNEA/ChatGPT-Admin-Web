import { Module } from '@nestjs/common';

import { EmailModule } from '@/libs/email/email.module';
import { JwtModule } from '@/libs/jwt/jwt.module';
import { SmsModule } from '@/libs/sms/sms.module';
import { WechatService } from '@/modules/auth/wechat.service';
import { DatabaseService } from '@/processors/database/database.service';
import { RedisModule } from '@/processors/redis/redis.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModule, RedisModule, EmailModule, SmsModule],
  controllers: [AuthController],
  providers: [AuthService, DatabaseService, WechatService],
})
export class AuthModule {}
