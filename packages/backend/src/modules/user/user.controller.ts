import { Body, Controller, Get, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Payload } from '@/common/guards/auth.guard';
import { JoiValidationPipe } from '@/common/pipes/joi';
import * as Joi from 'joi';

const nameSchema = Joi.string().min(4).max(20).required();

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  async getInfo(@Payload('id') uid: number) {
    return {
      success: true,
      data: await this.userService.getInfo(uid),
    };
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

  @Get('settings')
  async getSettings(@Payload('id') userId: number) {
    return await this.userService.getSettings(userId);
  }

  // @Put('info')
  // async updateInfo(@Payload('id') uid: number) {
  //   return await this.userService.updateInfo(uid);
  // }
}
