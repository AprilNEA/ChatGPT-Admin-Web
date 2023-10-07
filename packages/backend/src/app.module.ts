import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/user/user.module';
import { ChatModule } from '@/modules/chat/chat.module';
import { OrderModule } from '@/modules/order/order.module';
import { JwtModule } from '@libs/jwt';
import { AuthGuard } from '@/common/guards/auth.guard';
import { DashboardModule } from '@/modules/dashboard/dashboard.module';
import { ProductModule } from '@/modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
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
