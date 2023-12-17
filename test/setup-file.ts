import { expect } from 'vitest';
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

interface CustomMatchers<R = unknown> {
  toBeSafe(): R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}

  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

expect.extend({ toBeSafe });

// import { redisHelper } from './helper/redis-mock.helper'
// import { prisma } from './lib/prisma'
// import resetDb from './lib/reset-db'
//
// beforeAll(() => {})
//
// beforeEach(async () => {
//   await resetDb()
// })
//
// afterAll(async () => {
//   await resetDb()
//   await prisma.$disconnect()
//   await (await redisHelper).close()
// })
