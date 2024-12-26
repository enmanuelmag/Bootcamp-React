import React from 'react';

type PaginationProps<T> = {
  data?: T[];
  pageSize: number;
};

export const usePagination = <T>(params: PaginationProps<T>) => {
  const { data = [], pageSize } = params;

  const [page, setPage] = React.useState(1);

  const [totalPages, setTotalPages] = React.useState(
    Math.ceil(data.length / pageSize)
  );

  React.useEffect(() => {
    setTotalPages(Math.ceil(data.length / pageSize));
  }, [data, pageSize]);

  // Update total pages when data changes
  const pageData = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return data.slice(start, end);
  }, [data, page, pageSize]);

  return {
    page,
    pageData,
    totalPages,
    totalItems: data.length,
    nextPage,
    prevPage,
    goToPage,
  };

  function nextPage() {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }

  function prevPage() {
    setPage((prev) => Math.max(prev - 1, 1));
  }

  function goToPage(page: number) {
    setPage(Math.min(Math.max(page, 1), totalPages));
  }
};
