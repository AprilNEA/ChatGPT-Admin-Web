import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { Role } from '@prisma/client';

import { Payload, Public } from '@/common/guards/auth.guard';
import { JoiValidationPipe } from '@/common/pipes/joi';
import { WechatService } from '@/modules/auth/wechat.service';

import { forgetPasswordDto, identityDto, validateCodeDto } from 'shared';

import {
  bindIdentitySchema,
  forgetPasswordSchema,
  identitySchema,
  initAdminSchema,
  initPasswordSchema,
  passwordSchema,
  validateCodeSchema,
  withPasswordSchema,
} from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private wechatService: WechatService,
  ) {}

  @Public()
  @UsePipes(new JoiValidationPipe(initAdminSchema))
  @Post('admin/setup')
  async initAdmin(@Body() data: { identity: string; password: string }) {
    await this.authService.initAdmin(data.identity, data.password);
    return {
      success: true,
    };
  }

  /* 方法一：密码登录 */
  @Public()
  @UsePipes(new JoiValidationPipe(withPasswordSchema))
  @Post('password')
  async password(@Body() data: { identity: string; password: string }) {
    return {
      success: true,
      ...(await this.authService.loginPassword(data)),
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

  /** 2.通过验证码登录/注册，自动识别邮箱或手机号 */
  @Public()
  @UsePipes(new JoiValidationPipe(validateCodeSchema))
  @Post('validateCode')
  async loginByCode(@Body() data: validateCodeDto) {
    return {
      success: true,
      ...(await this.authService.WithValidateCode(data.identity, data.code)),
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

  /* 忘记密码 */
  @Public()
  @Post('forgetPassword')
  @UsePipes(new JoiValidationPipe(forgetPasswordSchema))
  async forgetPassword(@Body() data: forgetPasswordDto) {
    await this.authService.forgetPassword(
      data.identity,
      data.code,
      data.newPassword,
    );
    return {
      success: true,
    };
  }

  /* 修改密码 */
  @Put('changePassword')
  async changePassword(
    @Payload('id') userId: number,
    @Body('password', new JoiValidationPipe(passwordSchema)) password: string,
  ) {
    await this.authService.changePassword(userId, password);
    return {
      success: true,
    };
  }

  @Put('initUsername')
  async initName(
    @Payload('id') userId: number,
    @Body(new JoiValidationPipe(initPasswordSchema))
    body: { username: string },
  ) {
    await this.authService.initUsername(userId, body.username);
    return {
      success: true,
    };
  }

  /* 首次设置密码，可首次添加用户名，不可修改用户名 */
  @Put('initPassword')
  async initPassword(
    @Payload('id') userId: number,
    @Body(new JoiValidationPipe(initPasswordSchema))
    body: { password: string },
  ) {
    await this.authService.initPassword(userId, body.password);
    return {
      success: true,
    };
  }

  /* 绑定账户（邮箱或者密码） */
  @Put('bindIdentity')
  @UsePipes(new JoiValidationPipe(bindIdentitySchema))
  async initIdentity(
    @Payload('id') userId: number,
    @Body() data: { identity: string },
  ) {
    await this.authService.bindIdentity(userId, data.identity, true);
    return {
      success: true,
    };
  }

  @Get('roles')
  async getRoles(@Payload('role') roles: Role[]) {
    return {
      success: true,
      data: roles,
    };
  }
}
