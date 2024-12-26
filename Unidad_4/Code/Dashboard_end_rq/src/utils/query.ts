/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseQueryResult } from '@tanstack/react-query';

export const isLoadingQuery = (...results: UseQueryResult[]) => {
  return results.some((r) => r.isLoading);
};

export const isLoadingOrRefetchQuery = (...results: UseQueryResult[]) => {
  return results.some((r) => r.isFetching || r.isLoading);
};

export const isRefetchingQuery = (...results: UseQueryResult[]) => {
  return results.some((r) => r.isFetching);
};

export const isLoadingMutation = (...results: any[]) => {
  return results.some((r) => r.isPending && !r.isIdle);
};
