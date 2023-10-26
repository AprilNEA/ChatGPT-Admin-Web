// import * as Joi from "Joi";
import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Public, Roles } from '@/common/guards/auth.guard';

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

  /* 获取最近的网站公告 */
  @Get('/announcement')
  async getRecentAnnouncement() {
    return {
      success: true,
      data: await this.appService.getRecentAnnouncement(),
    };
  }
}
