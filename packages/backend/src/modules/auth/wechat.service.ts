import { CustomPrismaService } from 'nestjs-prisma';

import { Inject, Injectable } from '@nestjs/common';
import { OAuthProvider } from '@prisma/client';

import { ConfigService } from '@/common/config';
import { JwtService } from '@/libs/jwt/jwt.service';
import { ExtendedPrismaClient } from '@/processors/database/prisma.extension';

import { ConfigType } from 'shared/';

@Injectable()
export class WechatService {
  private wechatConfig: ConfigType['wechat'];

  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<ExtendedPrismaClient>,
    private jwtService: JwtService,
    configService: ConfigService,
  ) {
    this.wechatConfig = configService.get('wechat');
  }

  async wechatOauth(code: string) {
    const {
      access_token: accessToken,
      expires_in: expiresIn,
      refresh_token: refreshToken,
      openid,
    }: {
      access_token: string;
      expires_in: number;
      refresh_token: string;
      openid: string;
      scope: string;
      unionid?: string;
    } = await fetch(
      'https://api.weixin.qq.com/sns/oauth2/access_token?' +
        new URLSearchParams([
          ['appid', this.wechatConfig.oauth.appId],
          ['secret', this.wechatConfig.oauth.appSecret],
          ['code', code],
          ['grant_type', 'authorization_code'],
        ]),
    ).then((res) => res.json());
    const expiredAt = new Date(Date.now() + expiresIn * 1000);
    return {
      openid,
      accessToken,
      refreshToken,
      expiredAt,
    };
  }

  async refreshAccessToken(refreshToken: string) {}

  async getInfo(accessToken: string, openid: string) {
    return (await fetch(
      'https://api.weixin.qq.com/sns/userinfo?' +
        new URLSearchParams([
          ['access_token', accessToken],
          ['openai', openid],
        ]),
    ).then((res) => res.json())) as {
      openid: string;
      nickname: string;
      sex: 1 | 2;
      province: string;
      city: string;
      country: string;
      headimgurl: string;
      privilege: string[];
      unionid?: string;
    };
  }

  async loginByWeChat(token) {
    const user = (
      await this.prisma.client.oAuth.findUnique({
        where: {
          provider_providerId: {
            provider: OAuthProvider.Wechat,
            providerId: token.openid,
          },
        },
        include: {
          user: true,
        },
      })
    )?.user;
    if (!user) {
      return false;
    }
    return this.jwtService.sign({ id: user.id, role: user.role });
  }

  async registerByWeChat(token, userInfo) {
    const user = await this.prisma.client.user.create({
      data: {
        name: `wx_${token.openid}`,
        oauths: {
          create: {
            provider: OAuthProvider.Wechat,
            providerId: token.openid,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            expiredAt: token.expiredAt,
            data: userInfo,
          },
        },
      },
    });
    return this.jwtService.sign({ id: user.id, role: user.role });
  }
}
