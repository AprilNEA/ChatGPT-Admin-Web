import { Config } from 'prettier';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RedisService } from './redis.service';

@Module({
  imports: [ConfigModule],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
