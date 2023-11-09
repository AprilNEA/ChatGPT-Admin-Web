import pagination from 'prisma-extension-pagination';

import { PrismaClient } from '@prisma/client';

export const createExtendedPrismaClient = ({ url }: { url?: string } = {}) => {
  return new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  }).$extends(pagination());
};

export type ExtendedPrismaClient = ReturnType<
  typeof createExtendedPrismaClient
>;
