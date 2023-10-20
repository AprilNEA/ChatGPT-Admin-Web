import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@/libs/jwt/jwt.module';
import { RedisModule } from '@/processors/redis/redis.module';
import { DatabaseService } from '@/processors/database/database.service';
import { EmailModule } from '@/libs/email/email.module';
import { WechatService } from '@/modules/auth/wechat.service';

@Module({
  imports: [JwtModule, RedisModule, EmailModule],
  controllers: [AuthController],
  providers: [AuthService, DatabaseService, WechatService],
})
export class AuthModule {}
