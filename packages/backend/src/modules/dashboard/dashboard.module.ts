import { Module } from '@nestjs/common';

import { ConfigModule } from '@/common/config/config.module';
import { ConfigService } from '@/common/config/config.service';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [ConfigModule],
  controllers: [DashboardController],
  providers: [DashboardService, ConfigService],
})
export class DashboardModule {}
