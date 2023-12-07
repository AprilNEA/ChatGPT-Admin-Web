import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

import { BizException } from '@/common/exceptions/biz.exception';
import { JWTPayload, JwtService } from '@/libs/jwt/jwt.service';

import { ErrorCodeEnum } from 'shared';

export { Role } from '@prisma/client';
export const ROLES_KEY = 'roles';
export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

export const Payload = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const payload = ctx.switchToHttp().getRequest().payload as JWTPayload;
    if (key) return payload?.[key];
    return payload;
  },
);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      if (isPublic) return true;
      throw new BizException(ErrorCodeEnum.AuthFail);
    } else {
      try {
        request['payload'] = await this.jwtService.verify(token);
      } catch {
        if (isPublic) return true;
        throw new BizException(ErrorCodeEnum.AuthFail);
      }
    }

    const roles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) return true;

    return this.matchRoles(roles, request['payload']?.role);
  }

  private matchRoles(roles: Role[], payload: Role): boolean {
    return roles.includes(payload);
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] =
      new Headers(request.headers).get('authorization')?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
