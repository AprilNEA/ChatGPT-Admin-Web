import { createClient, RedisClientType } from 'redis';
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthCode } from 'src/auth-code';

@Injectable()
export class RedisService implements OnModuleInit {
  constructor(private config: ConfigService) {}

  public client: RedisClientType = createClient({
    url: this.config.get('redis').url,
  });

  public authCode = new AuthCode(this.client);

  async onModuleInit() {
    console.log('[Redis] Module Init');
    this.client.on('error', (err) => console.log('Redis Client Error', err));
    await this.client.connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    await this.client.disconnect();
  }
}
