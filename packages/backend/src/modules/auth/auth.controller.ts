import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JoiValidationPipe } from '@/common/pipes/joi';
import {
  passwordSchema,
  identitySchema,
  validateCodeSchema,
  bindPasswordSchema,
} from './auth.dto';
import {
  validateCodeDto,
  byPasswordDto,
  requestCodeDto,
  identityDto,
} from 'shared';
import { Payload, Public } from '@/common/guards/auth.guard';
import { WechatService } from '@/modules/auth/wechat.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private wechatService: WechatService,
  ) {}

  /* 方法一：密码登录 */
  @Public()
  @UsePipes(new JoiValidationPipe(passwordSchema))
  @Post('password')
  async password(@Body() data: byPasswordDto) {
    return {
      success: true,
      token: await this.authService.loginPassword(data),
    };
  }

  /* 方法二：验证码登录/注册 */
  /** 1. 获取验证码 **/
  @Public()
  @Get('validateCode')
  async newValidateCode(
    @Query(new JoiValidationPipe(identitySchema)) query: identityDto,
  ) {
    return await this.authService.newValidateCode(query.identity);
  }

  /** 2.通过验证码登录，自动识别邮箱或手机号 */
  @Public()
  @UsePipes(new JoiValidationPipe(validateCodeSchema))
  @Post('validateCode')
  async loginByCode(@Body() data: validateCodeDto) {
    // token: await this.authService.registerByPassword(code, data),
    return {
      success: true,
      token: await this.authService.WithValidateCode(data.identity, data.code),
    };
  }

  /* 方法三：微信登录/注册 */
  @Public()
  @Get('wechatCode')
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

  /* 设置密码 */
  @Put('bindPassword')
  @UsePipes(new JoiValidationPipe(bindPasswordSchema))
  async bindPassword(
    @Payload('id') userId: number,
    @Body('password') password: string,
  ) {
    await this.authService.bindPassword(userId, password);
    return {
      success: true,
    };
  }

  /* 绑定账户 */
  @Put('bindIdentity')
  async bindIdentity() {}
}
