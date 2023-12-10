import { ZodObject } from 'zod';

import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

import { BizException } from '@/common/exceptions/biz.exception';

import { ErrorCodeEnum } from 'shared';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      throw new BizException(ErrorCodeEnum.ValidationError);
    }
  }
}
