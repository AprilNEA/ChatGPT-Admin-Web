import * as Joi from 'joi';

import { Body, Controller, Get, Put } from '@nestjs/common';

import { Payload } from '@/common/guards/auth.guard';
import { JoiValidationPipe } from '@/common/pipes/joi';

import { UserService } from './user.service';

const nameSchema = Joi.string().min(4).max(20).required();

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* 用户基本信息：用户名、手机号、邮箱、是否为 Premium 会员 */
  @Get('info')
  async getInfo(@Payload('id') userId: number) {
    return {
      success: true,
      data: await this.userService.getInfo(userId),
    };
  }

  @Get('limit')
  async getPremium(@Payload('id') userId: number) {
    return {
      success: true,
      data: {
        times: 100,
      },
    };
  }

  @Get('orders')
  async getUserOrders(@Payload('id') userId: number) {}

  @Get('settings')
  async getSettings(@Payload('id') userId: number) {
    return await this.userService.getSettings(userId);
  }

  @Put('name')
  async updateName(
    @Payload('id') userId: number,
    @Body('name', new JoiValidationPipe(nameSchema)) name: string,
  ) {
    return {
      success: true,
      data: await this.userService.updateName(userId, name),
    };
  }
}
