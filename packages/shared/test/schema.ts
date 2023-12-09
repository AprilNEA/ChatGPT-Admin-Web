import { ZodError } from 'zod';

export function toBeSafe<T extends any>(
  received: { success: true; data: T; error?: ZodError },
  expected?: T,
) {
  // @ts-ignore
  const { isNot } = this;
  return {
    // 请勿根据 isNot 参数更改你的 "pass" 值，Vitest 为你做了这件事情
    pass:
      expected !== undefined
        ? received.success && received.data === expected
        : received.success,
    message: () => `${received.data} is${isNot ? ' not' : ''} safe`,
  };
}
