import { useState, useCallback } from 'react';
import type { PageParams } from '../types/pagination';

interface UsePaginationOptions {
  initialPage?: number;
  initialSize?: number;
  initialSort?: string;
  initialKeyword?: string;
}

export const usePagination = (options: UsePaginationOptions = {}) => {
  const {
    initialPage = 0,
    initialSize = 10,
    initialSort = '',
    initialKeyword = '',
  } = options;

  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);
  const [sort, setSort] = useState(initialSort);
  const [keyword, setKeyword] = useState(initialKeyword);

  // Computed params để pass vào API
  const pageParams: PageParams = {
    page,
    size,
    ...(sort && { sort }),
    ...(keyword && { keyword }),
  };

  // Các hàm điều khiển
  const nextPage = useCallback(() => setPage((p) => p + 1), []);
  const prevPage = useCallback(() => setPage((p) => Math.max(0, p - 1)), []);
  
  const goToPage = useCallback((newPage: number) => {
    setPage(Math.max(0, newPage));
  }, []);

  const changeSize = useCallback((newSize: number) => {
    setSize(newSize);
    setPage(0); // Reset về trang đầu khi đổi size
  }, []);

  const handleSearch = useCallback((newKeyword: string) => {
    setKeyword(newKeyword);
    setPage(0); // Reset về trang đầu khi search
  }, []);

  const changeSort = useCallback((newSort: string) => {
    setSort(newSort);
    setPage(0);
  }, []);

  const reset = useCallback(() => {
    setPage(initialPage);
    setSize(initialSize);
    setSort(initialSort);
    setKeyword(initialKeyword);
  }, [initialPage, initialSize, initialSort, initialKeyword]);

  return {
    // States
    page,
    size,
    sort,
    keyword,
    pageParams, // Pass cái này thẳng vào fetchAPI

    // Actions
    setPage: goToPage,
    nextPage,
    prevPage,
    changeSize,
    handleSearch,
    changeSort,
    reset,
  };
};
