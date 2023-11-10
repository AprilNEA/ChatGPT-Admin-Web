import { useCallback } from 'react';

import { Button } from '@radix-ui/themes';

import { PageMeta } from 'shared';

import styles from './table.module.scss';

export interface PaginationProps {
  meta: PageMeta;
  prevPage: () => void;
  nextPage: () => void;
}

export function Pagination(props: PaginationProps) {
  const { pageCount, currentPage } = props.meta;

  const calculatePageNumbers = useCallback((): (number | string)[] => {
    const pages: (number | string)[] = [];
    let startPage: number;
    let endPage: number;

    if (pageCount <= 5) {
      // 如果总页数小于等于5，显示所有页码
      startPage = 1;
      endPage = pageCount;
    } else {
      // 如果当前页是前三页，始终显示前5页
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      }
      // 如果当前页是最后三页，显示最后5页
      else if (currentPage >= pageCount - 2) {
        startPage = pageCount - 4;
        endPage = pageCount;
      }
      // 当前页不在前三页也不在后三页，显示当前页前后各两页
      else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    // 添加第一页和省略号
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        // 如果当前页码前面的页码不止一个，添加省略号
        pages.push('...');
      }
    }

    // 生成页码
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // 添加最后一页和省略号
    if (endPage < pageCount) {
      if (endPage < pageCount - 1) {
        // 如果当前页码后面的页码不止一个，添加省略号
        pages.push('...');
      }
      pages.push(pageCount);
    }

    return pages;
  }, [currentPage, pageCount]);

  const pageNumbers = calculatePageNumbers();

  return (
    <div className={styles.container}>
      <Button mx="2" onClick={props.prevPage} disabled={currentPage < 2}>
        上一页
      </Button>
      {pageNumbers.map((page, index) => (
        <Button
          mx="1"
          key={page}
          variant="surface"
          highContrast={currentPage === page}
          disabled={typeof page === 'string'}
        >
          {page}
        </Button>
      ))}
      <Button
        mx="2"
        onClick={props.nextPage}
        disabled={currentPage + 1 > pageCount}
      >
        下一页
      </Button>
    </div>
  );
}
