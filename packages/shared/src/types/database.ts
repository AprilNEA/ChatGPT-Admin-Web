/* T is list */
export interface PaginationResultList<T> {
  data: T;
  pagination: Paginator;
}

export interface Paginator {
  /* total number of articles */
  total: number;
  /* How many entries per page */
  size: number;
  /* current page */
  currentPage: number;
  /* Total pages */
  totalPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
