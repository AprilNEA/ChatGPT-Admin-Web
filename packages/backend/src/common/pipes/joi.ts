import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { BizException } from '@/common/exceptions/biz.exception';

import { ErrorCodeEnum } from 'shared/dist/error-code';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: any) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BizException(ErrorCodeEnum.ValidationError);
    }
    return value;
  }
}
