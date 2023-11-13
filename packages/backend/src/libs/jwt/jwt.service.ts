import {
  type JWTPayload as JWTPayloadDefault,
  SignJWT,
  importJWK,
  jwtVerify,
} from 'jose';

import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';

import { ConfigService } from '@/common/config';

export type JWTPayload = JWTPayloadDefault & {
  id: number;
  role: Role;
};

@Injectable()
export class JwtService {
  constructor(private configService: ConfigService) {}

  async getKey(type: 'public' | 'private') {
    switch (this.configService.get('jwt').algorithm) {
      case 'ES256':
        if (type === 'private') {
          return await importJWK(
            JSON.parse(this.configService.get('jwt').privateKey),
            'ES256',
          );
        }
        return await importJWK(
          JSON.parse(this.configService.get('jwt').publicKey),
          'ES256',
        );
      case 'HS256':
        return new TextEncoder().encode(this.configService.get('jwt').secret);
    }
  }

  async sign(payload: JWTPayload): Promise<string> {
    const iat = Math.floor(Date.now() / 1000); // Not before: Now
    const exp = iat + 7 * 24 * 60 * 60; // One week
    return await new SignJWT({ ...payload })
      .setProtectedHeader({
        alg: this.configService.get('jwt').algorithm,
        typ: 'JWT',
      })
      .setExpirationTime(exp)
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(await this.getKey('private'));
  }

  async verify(token: string): Promise<JWTPayload> {
    try {
      const { payload } = await jwtVerify(token, await this.getKey('public'));
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000))
        throw Error('Token expired');
      return payload as JWTPayload;
    } catch (e) {
      throw Error('Invalid token');
    }
  }

  async resume(token: string): Promise<string> {
    try {
      const payload = await this.verify(token);
      return await this.sign({ id: payload.id, role: payload.role });
    } catch (e) {
      throw Error('Invalid token');
    }
  }
}
