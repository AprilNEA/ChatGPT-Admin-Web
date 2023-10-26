import { Controller, Get, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Payload } from '@/common/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  async getInfo(@Payload('id') uid: number) {
    return await this.userService.getInfo(uid);
  }

  @Get('settings')
  async getSettings(@Payload('id') uid: number) {
    return await this.userService.getSettings(uid);
  }

  // @Put('info')
  // async updateInfo(@Payload('id') uid: number) {
  //   return await this.userService.updateInfo(uid);
  // }
}
