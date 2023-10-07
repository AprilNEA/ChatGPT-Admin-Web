import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JoiValidationPipe } from '@/pipes/joi';
import { identitySchema, loginByCodeSchema } from './auth.dto';
import { loginByCodeDto, byPasswordDto, requestCodeDto } from 'shared';
import { Public } from '@/common/guards/auth.guard';
import { WechatService } from '@/modules/auth/wechat.service';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private wechatService: WechatService,
  ) {}

  @UsePipes(new JoiValidationPipe(identitySchema))
  @Post('code')
  async requestCode(@Body() data: requestCodeDto) {
    return {
      success: await this.authService.requestCode(data.identity),
    };
  }

  @UsePipes(new JoiValidationPipe(loginByCodeSchema))
  @Post('login/code')
  async loginByCode(@Body() data: loginByCodeDto) {
    return {
      success: true,
      token: await this.authService.loginByCode(data.identity, data.code),
    };
  }

  // @UsePipes(new JoiValidationPipe(byPasswordSchema))
  @Post('login/password')
  async loginByPassword(@Body() data: byPasswordDto) {
    return {
      success: true,
      token: await this.authService.loginByPassword(data),
    };
  }

  @Get('login/wechat/oauth')
  async wechatOauth(@Query() code: string) {
    const tokenData = await this.wechatService.wechatOauth(code);
    const jwt = this.wechatService.loginByWeChat(tokenData);
    if (!jwt) {
      const userInfo = await this.wechatService.getInfo(
        tokenData.accessToken,
        tokenData.openid,
      );
      return {
        token: this.wechatService.registerByWeChat(tokenData, userInfo),
      };
    } else {
      return {
        token: jwt,
      };
    }
  }

  // @UsePipes(new JoiValidationPipe(byPasswordSchema))
  /* 通过验证码注册 */
  @Post('register')
  async registerByPassword(
    @Query('code') code: string,
    @Body() data: byPasswordDto,
  ) {
    return {
      success: true,
      token: await this.authService.registerByPassword(code, data),
    };
  }
}
