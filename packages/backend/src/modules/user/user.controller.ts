import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Payload } from '@/common/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('settings')
  async getSettings(@Payload('id') uid: number) {
    return await this.userService.getSettings(uid);
  }
}
