import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { Role } from '@prisma/client';

import { ConfigService } from '@/common/config';
import { BizException } from '@/common/exceptions/biz.exception';
import { Payload, Public } from '@/common/guards/auth.guard';
import { ZodValidationPipe } from '@/common/pipes/zod';
import { JWTPayload } from '@/libs/jwt/jwt.service';
import { WechatService } from '@/modules/auth/wechat.service';

import { AuthDTO, ErrorCodeEnum } from 'shared';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private wechatService: WechatService,
    private configService: ConfigService,
  ) {}

  @Public()
  @Post('admin/setup')
  async initAdmin(
    @Body(new ZodValidationPipe(AuthDTO.InitAdminSchema))
    body: AuthDTO.InitAdminDto,
  ) {
    await this.authService.initAdmin(body.identity, body.password);
    return {
      success: true,
    };
  }

  /* 方法一：密码登录
   * WARN: 当邮箱和短信通知均为开启时，用户可直接通过该接口注册
   * WARN: When both email and SMS notification are enabled,
   *        users can register directly through this interface.
   */
  @Public()
  @Post('password')
  async password(
    @Body(new ZodValidationPipe(AuthDTO.PasswordLoginSchema))
    body: AuthDTO.PasswordLoginDto,
  ) {
    try {
      return {
        success: true,
        ...(await this.authService.loginPassword(body)),
      };
    } catch (e) {
      if (
        e instanceof BizException &&
        e.code === ErrorCodeEnum.UserNotExist &&
        this.configService.checkNotifierEnable(false) === false // It won't hold as long as one is enabled
      ) {
        return {
          success: true,
          ...(await this.authService.registerPassword(body)),
        };
      }
      throw e;
    }
  }

  /* 方法二：验证码登录/注册 */
  /** 1. 获取验证码 **/
  @Public()
  @Get('validateCode')
  async newValidateCode(
    @Query(new ZodValidationPipe(AuthDTO.RequireCodeSchema))
    body: AuthDTO.RequireCodeDto,
  ) {
    return await this.authService.newValidateCode(body.identity);
  }

  /** 2.通过验证码登录/注册，自动识别邮箱或手机号 */
  @Public()
  @Post('validateCode')
  async loginByCode(
    @Body(new ZodValidationPipe(AuthDTO.ValidateCodeSchema))
    data: AuthDTO.ValidateCodeDto,
  ) {
    return {
      success: true,
      ...(await this.authService.withValidateCode(data.identity, data.code)),
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
  async forgetPassword(
    @Body(new ZodValidationPipe(AuthDTO.ForgetPasswordSchema))
    data: AuthDTO.ForgetPasswordDto,
  ) {
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
    @Body(new ZodValidationPipe(AuthDTO.ChangePasswordSchema))
    data: AuthDTO.ChangePasswordDto,
  ) {
    await this.authService.changePassword({
      userId,
      ...data,
    });
    return {
      success: true,
    };
  }

  @Put('initUsername')
  async initName(
    @Payload('id') userId: number,
    @Body(new ZodValidationPipe(AuthDTO.InitUsernameSchema))
    body: AuthDTO.InitUsernameDto,
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
    @Body(new ZodValidationPipe(AuthDTO.InitPasswordSchema))
    body: AuthDTO.InitPasswordDto,
  ) {
    await this.authService.initPassword(userId, body.password);
    return {
      success: true,
    };
  }

  /* 绑定账户（邮箱或者密码） */
  @Put('bindIdentity')
  async initIdentity(
    @Payload('id') userId: number,
    @Body(new ZodValidationPipe(AuthDTO.BindIdentitySchema))
    data: AuthDTO.BindIdentityDto,
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

  @Get('refresh')
  async refresh(@Payload() payload: JWTPayload) {
    return {
      success: true,
      ...(await this.authService.refresh(payload.id, payload.role)),
    };
  }
}
