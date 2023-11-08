// import * as Joi from "Joi";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Public, Roles } from '@/common/guards/auth.guard';

import { AppService } from './app.service';

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

  /* 获取最近一条的网站公告 */
  @Get('/announcement/recent')
  async getRecentAnnouncement() {
    return {
      success: true,
      data: await this.appService.getRecentAnnouncement(),
    };
  }

  /* 获取网站所有的公告 */
  @Get('/announcement/all')
  async getAllAnnouncement() {
    return {
      success: true,
      data: await this.appService.getAllAnnouncement(),
    };
  }

  /* 添加或更新公告 */
  @Post('/announcement')
  async newAnnouncement(
    @Body() data: { id?: number; title?: string; content?: string },
  ) {
    return {
      success: true,
      data: await this.appService.upsertAnnouncement({
        ...data,
      }),
    };
  }

  /* 删除公告 */
  @Delete('/announcement/:id')
  async deleteAnnouncement(@Param('id') id: number) {
    await this.appService.deleteAnnouncement(id);
    return {
      success: true,
    };
  }
}
