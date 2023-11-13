import { CustomPrismaModule } from 'nestjs-prisma';

import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ConfigModule } from '@/common/config';
import { AuthGuard } from '@/common/guards/auth.guard';
import { JwtModule } from '@/libs/jwt/jwt.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { ChatModule } from '@/modules/chat/chat.module';
import { DashboardModule } from '@/modules/dashboard/dashboard.module';
import { OrderModule } from '@/modules/order/order.module';
import { ProductModule } from '@/modules/product/product.module';
import { UserModule } from '@/modules/user/user.module';
import { ExtendedPrismaConfigService } from '@/processors/database/prisma.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule,
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      useClass: ExtendedPrismaConfigService,
      isGlobal: true,
    }),
    RedisModule.forRoot({
      config: {
        url: process.env.REDIS_URL,
      },
    }),
    AuthModule,
    UserModule,
    ChatModule,
    OrderModule,
    JwtModule,
    DashboardModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
