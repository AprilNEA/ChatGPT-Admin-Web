'client-only';

import { useState } from 'react';

import { PageMeta } from 'shared';

export function usePager(props: { page?: number; size?: number }) {
  const [page, setPage] = useState<number>(props.page ?? 1);
  const [limit, setLimit] = useState<number>(props.size ?? 10);

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const nextPage = () => setPage(page + 1);

  return {
    page,
    limit,
    setPage,
    setLimit,
    prevPage,
    nextPage,
  };
}
