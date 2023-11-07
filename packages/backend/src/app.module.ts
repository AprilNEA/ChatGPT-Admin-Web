import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard } from '@/common/guards/auth.guard';
import { JwtModule } from '@/libs/jwt/jwt.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { ChatModule } from '@/modules/chat/chat.module';
import { DashboardModule } from '@/modules/dashboard/dashboard.module';
import { OrderModule } from '@/modules/order/order.module';
import { ProductModule } from '@/modules/product/product.module';
import { UserModule } from '@/modules/user/user.module';
import { DatabaseService } from '@/processors/database/database.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    RedisModule.forRoot({
      config: {
        url: configuration().redis.url,
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
    DatabaseService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
