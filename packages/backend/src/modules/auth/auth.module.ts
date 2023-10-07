import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@libs/jwt';
import { RedisModule } from '@libs/redis';
import { PrismaService } from '@/processors/database/prisma.service';
import { EmailModule } from '@libs/email';
import { WechatService } from '@/modules/auth/wechat.service';

@Module({
  imports: [JwtModule, RedisModule, EmailModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, WechatService],
})
export class AuthModule {}
