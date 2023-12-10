import { expect } from 'vitest';

import { toBeSafe } from '@test/schema';

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
