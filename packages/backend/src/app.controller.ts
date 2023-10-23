import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from '@/common/guards/auth.guard';

@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  health() {
    const packageJson = require('../../../package.json');

    return {
      version: packageJson.version,
    };
  }

  @Post('/install')
  getHello(): string {
    return this.appService.getHello();
  }
}
