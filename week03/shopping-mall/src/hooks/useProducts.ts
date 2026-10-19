import { useInfiniteQuery } from '@tanstack/react-query';
import { getNextSkip, getProducts, PAGE_SIZE } from '../api/products';

export function useProducts() {
  return useInfiniteQuery({
    queryKey: ['products', PAGE_SIZE],
    queryFn: ({ pageParam, signal }) => getProducts(pageParam, signal),
    initialPageParam: 0,
    getNextPageParam: getNextSkip,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
