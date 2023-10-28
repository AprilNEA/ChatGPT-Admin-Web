import { Prisma, PrismaClient } from '@prisma/client';

import { PaginationResult } from 'shared';

export const createExtendedPrismaClient = ({ url }: { url?: string } = {}) => {
  const prismaClient = new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  });

  const extendedPrismaClient = prismaClient.$extends({
    model: {
      $allModels: {
        async paginate<T, A>(
          this: T,
          x: Prisma.Exact<
            A,
            Pick<
              Prisma.Args<T, 'findFirst'>,
              'where' | 'select' | 'include' | 'orderBy'
            >
          >,
          options: {
            page: number;
            size: number;
          },
        ): Promise<PaginationResult<Prisma.Result<T, A, 'findFirst'>>> {
          if (typeof x !== 'object') {
            return {
              data: [],
              pagination: {
                total: 0,
                size: 0,
                totalPage: 0,
                currentPage: 0,

                hasNextPage: false,
                hasPrevPage: false,
              },
            };
          }

          const { page, size: perPage } = options;
          const skip = page > 0 ? perPage * (page - 1) : 0;
          const countArgs = 'select' in x ? { where: x.where } : {};
          const [total, data] = await Promise.all([
            (this as any).count(countArgs),
            (this as any).findMany({
              ...x,
              take: perPage,
              skip,

              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              orderBy: x.orderBy,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              include: x.include,
            }),
          ]);

          const lastPage = Math.ceil(total / perPage);

          return {
            data,
            pagination: {
              total,
              size: perPage,
              totalPage: lastPage,
              currentPage: page,
              hasNextPage: page < lastPage,
              hasPrevPage: page > 1,
            },
          } as PaginationResult<any>;
        },
        async exists<T, A>(
          this: T,
          x: Prisma.Exact<A, Pick<Prisma.Args<T, 'findFirst'>, 'where'>>,
        ): Promise<boolean> {
          if (typeof x !== 'object') {
            return false;
          }
          if (!('where' in x)) {
            return false;
          }
          const count = await (this as any).count({ where: x.where });

          return count > 0;
        },
      },
    },
  });

  return extendedPrismaClient;
};

export type extendedPrismaClient = ReturnType<
  typeof createExtendedPrismaClient
>;
