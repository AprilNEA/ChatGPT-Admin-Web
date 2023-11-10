/* T is list */
export interface IPagination<T> {
  data: T[];
  meta: PageMeta;
}

export interface PageMeta {
  currentPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  previousPage: number;
  nextPage: number;
  totalCount: number;
  pageCount: number;
}

export interface CursorMeta {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
}
